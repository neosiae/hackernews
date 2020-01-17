import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import User from './User'

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  url: string

  @Column({ default: 0 })
  points: number

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(type => User)
  author: User
}