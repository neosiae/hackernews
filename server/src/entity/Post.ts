import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm'
import User from './User'
import Vote from './Vote'

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

  @ManyToOne(type => User, user => user.posts)
  author: User

  @OneToMany(type => Vote, vote => vote.post)
  votes: Vote[]
}