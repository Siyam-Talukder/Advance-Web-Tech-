import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId!: number;

  @Column('float')
  total!: number;

  @Column({ default: 'PENDING' })
  status!: string;

  @ManyToOne(() => Customer, customer => customer.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;
}