import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import User from '../entity/User'
import Post from '../entity/Post'
import Vote from '../entity/Vote'

export async function vote (req: Request, res: Response) {
  const userRepository = getManager().getRepository(User)
  const postRepository = getManager().getRepository(Post)
  const voteRepository = getManager().getRepository(Vote)

  try {
    const postId: any = req.params.postId

    const currentPost = await postRepository.findOne({ id: postId })
    const currentUser = await userRepository.findOne({ id: res.locals.userId })

    const existingVote = await getManager()
      .createQueryBuilder(Vote, 'vote')
      .where(
        'vote.author = :authorId AND vote.post = :postId', 
        { authorId: currentUser?.id, postId: currentPost?.id }
      )
      .getOne()

    if (existingVote) {
      return res.status(409).json({
        message: "Post can be upvoted only once."
      })
    }

    const upvote = voteRepository.create({ author: currentUser, post: currentPost })

    await voteRepository.save(upvote)

    const points = await getManager()
      .createQueryBuilder(Vote, 'vote')
      .where('vote.post = :postId', { postId: currentPost?.id })
      .getCount()

    await getManager()
      .createQueryBuilder()
      .update(Post)
      .set({
        points: points
      })
      .where('id = :id', { id: currentPost?.id })
      .execute()

    res.status(200).json({
      message: 'Upvote successful.'
    })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}