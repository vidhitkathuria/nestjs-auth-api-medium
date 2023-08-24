import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

enum ProductCategory {
  HomeDecor = 'home_decor',
  Electronics = 'electronics',
  Fashion = 'fashion',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ length: 100, nullable: true })
  product_name: string;

  @Column({ length: 200, nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({
    type: 'enum',
    enum: ProductCategory,
    default: ProductCategory.HomeDecor,
  })
  category: ProductCategory;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}