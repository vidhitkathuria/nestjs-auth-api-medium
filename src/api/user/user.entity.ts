import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Order } from '../order/order.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', nullable: false, default: '' })
  public email!: string;

  @Column({ type: 'boolean', nullable: false })
  public isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn()
  orders: Order[];

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  public name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;
}
