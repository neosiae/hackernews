import 'reflect-metadata'
import dotenv from 'dotenv'
import path from 'path'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createConnection } from 'typeorm'
import userRoutes from './routes/user'
import postRoutes from './routes/post'
import voteRoutes from './routes/vote'
import commentRoutes from './routes/comment'

dotenv.config({ path: path.resolve(__dirname, '.env' ) })

const PORT: string = process.env.PORT ?? '3001'

const app: Application = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api', userRoutes)
app.use('/api', postRoutes)
app.use('/api', voteRoutes)
app.use('/api', commentRoutes)

const init = async () => {
  try {
    await createConnection()
  } catch (err) {
    console.error(err)
  }

  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
}

init()
