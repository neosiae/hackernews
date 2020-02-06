import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { validationResult } from 'express-validator'
import User from '../entity/User'
import Post from '../entity/Post'
import Comment from '../entity/Comment'

export async function createComment (req: Request, res: Response) {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      validationErrors: validationErrors.array()
    })
  }

  const userRepository = getManager().getRepository(User)
  const postRepository = getManager().getRepository(Post)
  const commentRepository = getManager().getRepository(Comment)

  try {
    const postId: any = req.params.postId
    const text: string = req.body.text

    const currentUser = await userRepository.findOne({ id: res.locals.userId })
    const currentPost = await postRepository.findOne({ id: postId })
    
    const comment = commentRepository.create({ text: text, author: currentUser, post: currentPost })

    await commentRepository.save(comment)

    const commentsNumber = await getManager()
      .createQueryBuilder(Comment, 'comment')
      .where('comment.post = :postId', { postId: currentPost?.id })
      .getCount()

    await getManager()
      .createQueryBuilder()
      .update(Post)
      .set({
        commentsNumber: commentsNumber
      })
      .where('id = :id', { id: currentPost?.id })
      .execute()

    res.status(201).json({
      message: 'Comment successfully created.'
    })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

export async function getComments (req: Request, res: Response) {
  try {
    const postId: any = req.params.postId

    const comments = await getManager()
      .createQueryBuilder(Comment, 'comment')
      .innerJoin('comment.author', 'author')
      .addSelect('author.username')
      .where('comment.post = :postId', { postId: postId })
      .orderBy('comment.createdAt', 'DESC')
      .getMany()
    
    res.status(200).json(comments)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}