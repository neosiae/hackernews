import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import User from './User'
import Post from './Post'

@Entity()
export default class Vote {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => User, user => user.votes)
  author: User

  @ManyToOne(type => Post, post => post.votes)
  post: Post
}