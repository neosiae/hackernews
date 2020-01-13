import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
}