import { Router } from 'express'
import { signUp } from '../controllers/user'

const router: Router = Router()

router.post('/user/signup', signUp)

export default router