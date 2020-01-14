import { Router } from 'express'
import { signUp } from '../controllers/user'
import { check } from 'express-validator'

const router: Router = Router()

router.post('/user/signup', [
  check('username').isLength({ min: 3 }),
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
], signUp)

export default router