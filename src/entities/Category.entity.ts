import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Product } from './Product.entity'

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // --- Relations ---
  // Category has a Many-to-Many relationship with Product
  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[]
}
