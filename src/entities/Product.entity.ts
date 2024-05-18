import { Min } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { OrderItem } from './OrderItem.entity'
import { Category } from './Category.entity'

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false })
  name: string

  @Column({ type: 'text', nullable: false })
  description: string

  @Column({ type: 'text' })
  imageUrl: string

  @Column({ type: 'integer', nullable: false })
  @Min(0)
  quantity: number

  @Column({ type: 'integer', nullable: false })
  @Min(0)
  price: number

  @Column({ type: 'integer', nullable: false })
  @Min(0)
  prepTime: number // in minutes

  @Column({ type: 'text' })
  country: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  // --- Relations ---
  // Many-to-Many relationship between Product and Order through OrderItem
  @OneToMany(() => OrderItem, (orderedItem) => orderedItem.product)
  orderedItems: OrderItem[]

  // Many-to-Many relationship between Product and Category
  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories: Category[]
}
