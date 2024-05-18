import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Order } from './Order.entity'
import { Product } from './Product.entity'

@Entity({ name: 'orderItems' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'integer' })
  itemQty: number

  @Column({ type: 'integer' })
  itemPrice: number

  // --- Relations ---
  // Many-to-Many relationship between Product and Order through OrderItem
  @ManyToOne(() => Product, (product) => product.orderItems, {
    eager: true
  })
  @JoinColumn({ name: 'productId' })
  product: Product

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order
}
