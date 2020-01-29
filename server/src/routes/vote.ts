import { Router } from 'express'
import auth from '../middleware/auth'
import { upvote, getVote } from '../controllers/vote'

const router: Router = Router()

router.put('/posts/:postId/upvote', auth, upvote)
router.get('/posts/:postId/votes', auth, getVote)

export default router