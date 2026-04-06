import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { OrderItem } from '../entities/order-item.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User, Order, OrderItem])],
  controllers: [CustomersController], 
  providers: [CustomersService],      
})
export class CustomersModule {}