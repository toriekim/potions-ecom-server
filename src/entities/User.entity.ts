import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert
} from 'typeorm'
import { IsEmail } from 'class-validator'
import { Order } from './Order.entity'
import { encrypt } from '../utils/encrypt.util'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  firstName: string

  @Column({ nullable: false })
  lastName: string

  @Column({ unique: true, nullable: false })
  username: string

  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string

  @Column({ select: false })
  password: string

  @Column({ default: false })
  isAdmin: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // --- Relations ---
  // A User has many Orders
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  // --- Entity Listeners (Hooks) ---
  // TypeORM will call it before the entity is inserted using repository/manager save
  @BeforeInsert()
  async hashPassword() {
    this.password = await encrypt.hashPassword(this.password)
  }
}
