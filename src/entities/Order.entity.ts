import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User.entity'
import { OrderItem } from './OrderItem.entity'

export enum CartStatus {
  CART = 'cart',
  CANCELED = 'canceled',
  PURCHASED = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered'
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'integer', nullable: false })
  totalPrice: number

  @Column({ type: 'integer', nullable: false })
  totalQty: number

  @Column({ nullable: false })
  recipient: string

  @Column({ type: 'text', nullable: false })
  shippingAddress: string

  @Column({
    type: 'enum',
    enum: CartStatus,
    nullable: false,
    default: CartStatus.CART
  })
  status: CartStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // --- Relations ---
  // Many Orders belong to a User
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User

  // Many-to-Many relationship between Product and Order through OrderItem
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    eager: true
  })
  orderItems: OrderItem[]
}
