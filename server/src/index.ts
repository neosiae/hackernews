import "reflect-metadata"
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { createConnection } from 'typeorm'
import userRoutes from './routes/user'

const PORT: string = process.env.PORT ?? '3000'

const app: Application = express()

app.use(bodyParser.json())
app.use('/api', userRoutes)

const init = async () => {
  await createConnection()

  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
}

init()
