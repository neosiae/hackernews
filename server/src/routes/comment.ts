import { Router } from 'express'
import { check } from 'express-validator'
import { createComment, getComments } from '../controllers/comment'
import auth from '../middleware/auth'

const router: Router = Router()

router.post('/posts/:postId/comments', [
  check('text').not().isEmpty()
], auth, createComment)
router.get('/posts/:postId/comments', getComments)

export default router