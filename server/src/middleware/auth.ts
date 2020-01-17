import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default function auth (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization header is missing.'
    })
  }

  const token = authHeader.split(' ')[1]

  let decodedToken: any

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET ?? 'dev-secret')
  } catch (err) {
    return res.status(401).json({
      message: 'Not authorized.'
    })
  }

  res.locals.userId = decodedToken.userId

  next()
}