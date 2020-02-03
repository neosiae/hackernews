import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import Post from './Post'
import Vote from './Vote'

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string
  
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(type => Post, post => post.author)
  posts: Post[]

  @OneToMany(type => Vote, vote => vote.author)
  votes: Vote[]
}