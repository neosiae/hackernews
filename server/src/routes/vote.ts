import { Router } from 'express'
import auth from '../middleware/auth'
import { putVote, getVote } from '../controllers/vote'

const router: Router = Router()

router.put('/posts/:postId/upvote', auth, putVote)
router.get('/posts/:postId/votes', auth, getVote)

export default router