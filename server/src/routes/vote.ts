import { Router } from 'express'
import auth from '../middleware/auth'
import { vote } from '../controllers/vote'

const router: Router = Router()

router.put('/posts/:postId/upvote', auth, vote)

export default router