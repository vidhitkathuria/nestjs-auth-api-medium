import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'order_product' })
  products: Product[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;
  @Column('integer', { array: true, nullable: true }) // New column to store product IDs
  productIds: number[];

  @Column('integer', { nullable: false, default: 1 })
  quantity: number;
}
