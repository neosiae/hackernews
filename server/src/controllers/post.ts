import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getManager } from 'typeorm'
import User from '../entity/User'
import Post from '../entity/Post'

interface PostTypes {
  title: string
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
    const { title, url }: PostTypes = req.body
    const currentUser = await userRepository.findOne({ id: res.locals.userId })
    const post = postRepository.create({ title, url, author: currentUser })

    await postRepository.save(post)

    res.status(201).json({
      message: 'Post successfully created.'
    })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

interface QueryTypes {
  page: number
  limit: number
  order: string
}

export async function getPosts (req: Request, res: Response) {
  const { page, limit, order }: QueryTypes = req.query  

  try {
    if (order === 'newest') {
      const posts = await getManager()
        .createQueryBuilder(Post, 'post')
        .innerJoin('post.author', 'author')
        .addSelect('author.username')
        .orderBy('post.createdAt', 'DESC')
        .offset((page - 1) * limit)
        .limit(limit)
        .getMany()
      
      return res.status(200).json(posts)
    }

    const posts = await getManager()
      .createQueryBuilder(Post, 'post')
      .innerJoin('post.author', 'author')
      .addSelect('author.username')
      .orderBy('post.points / POW(EXTRACT(epoch from NOW() - post.createdAt) / 3600 + 2, 1.8)', 'DESC')
      .offset((page - 1) * limit)
      .limit(limit)
      .getMany()

    res.status(200).json(posts)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export async function getPost (req: Request, res: Response) {
  const postId: any = req.params.postId

  try {
    const post = await getManager()
      .createQueryBuilder(Post, 'post')
      .innerJoin('post.author', 'author')
      .addSelect('author.username')
      .where('post.id = :postId', { postId: postId })
      .getOne()
    
    res.status(200).json(post)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}