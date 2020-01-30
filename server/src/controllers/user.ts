import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getManager } from 'typeorm'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../entity/User'

interface SignUpTypes {
  username: string
  email: string
  password: string
}

export async function signUp (req: Request, res: Response) {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      validationErrors: validationErrors.array()
    })
  }

  const { username, email, password }: SignUpTypes = req.body
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

    await userRepository.save(user)

    res.status(201).json({
      message: 'User successfully created.'
    })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

interface SignInTypes {
  username: string
  password: string
}

export async function signIn (req: Request, res: Response) {
  const { username, password }: SignInTypes = req.body

  const userRepository = getManager().getRepository(User)

  try {
    const user = await userRepository.findOne({ username })

    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist."
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Incorrect password.'
      })
    }

    const userId = user.id
    const token = jwt.sign({ userId }, process.env.JWT_SECRET ?? 'dev-secret', { expiresIn: '1h' })

    res.status(200).json({
      token
    })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}