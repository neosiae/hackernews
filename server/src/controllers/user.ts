import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getManager } from 'typeorm'
import bcrypt from 'bcryptjs'
import User from '../entity/User'

interface IUser {
  username: string,
  email: string,
  password: string
}

export async function signUp (req: Request, res: Response) {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      validationErrors: validationErrors.array()
    })
  }

  const { username, email, password }: IUser = req.body
  const userRepository = getManager().getRepository(User)

  try {
    const existingUsername = await userRepository.findOne({ username })
    
    if (existingUsername) {
      return res.status(409).json({
        message: 'An account with this username already exists.'
      })
    }

    const existingEmail = await userRepository.findOne({ email })

    if (existingEmail) {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      })
    }
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = userRepository.create({ username, email, password: hashedPassword })

    try {
      await userRepository.save(user)

      res.status(201).json({
        message: 'User successfully created.'
      })
    } catch (err) {
      console.error(err)
      res.sendStatus(500)
    }
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}