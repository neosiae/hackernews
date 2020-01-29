import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import User from './User'
import Post from './Post'

@Entity()
export default class Vote {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => User)
  author: User

  @ManyToOne(type => Post)
  post: Post
}