import { Router } from 'express'
import { check } from 'express-validator'
import { createPost, getPosts, getPost } from '../controllers/post'
import auth from '../middleware/auth'

const router: Router = Router()

router.post('/posts', [
  check('title').not().isEmpty().isLength({ min: 3 }),
  check('url').isURL()
], auth, createPost)

router.get('/posts', getPosts)

router.get('/posts/:postId', getPost)

export default router