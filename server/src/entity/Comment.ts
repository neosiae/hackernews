import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import User from './User'
import Post from './Post'

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(type => User, user => user.comments)
  author: User

  @ManyToOne(type => Post, post => post.comments)
  post: Post
}