import { Min } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { OrderedItem } from './OrderedItem.entity'
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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // --- Relations ---
  // Many-to-Many relationship between Product and Order through OrderedItem
  @OneToMany(() => OrderedItem, (orderedItem) => orderedItem.product)
  orderedItems: OrderedItem[]

  // Many-to-Many relationship between Product and Category
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]
}
