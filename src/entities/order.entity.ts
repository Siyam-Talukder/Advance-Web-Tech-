import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity'; // <-- Import the new entity

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

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items!: OrderItem[]; 
}