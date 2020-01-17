import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getManager } from 'typeorm'
import User from '../entity/User'
import Post from '../entity/Post'

interface IPost {
  title: string,
  url: string
}

export async function createPost (req: Request, res: Response) {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      validationErrors: validationErrors.array()
    })
  }
  
  const userRepository = getManager().getRepository(User)
  const postRepository = getManager().getRepository(Post)

  try {
    const { title, url }: IPost = req.body
    
    const currentUser = await userRepository.findOne({ id: res.locals.userId })

    const post = postRepository.create({ title, url, author: currentUser })

    try {
      await postRepository.save(post)

      res.status(201).json({
        message: 'Post successfully created.'
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

export async function getPosts (req: Request, res: Response) {
  try {
    const posts = await getManager()
      .createQueryBuilder(Post, 'post')
      .innerJoin("post.author", "author")
      .addSelect("author.username")
      .orderBy("post.createdAt", "DESC")
      .getMany()

    res.status(200).json(posts)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}