import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  customerId!: number;

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @OneToOne(() => User, user => user.customer, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) 
  user!: User;

  @OneToMany(() => Order, order => order.customer, { cascade: true })
  orders!: Order[];
}