import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { UserRole } from '../enums/user-role.enum';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(Order) private orderRepository: Repository<Order>, 
    private readonly mailerService: MailerService,
  ) {}


  async register(createDto: CreateCustomerDto) {
    const existingCustomer = await this.customerRepository.findOne({ where: { user: { email: createDto.email } } });
    if (existingCustomer) {
      throw new BadRequestException('Email is already registered!');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createDto.password, salt);

    const newCustomer = this.customerRepository.create({
      address: createDto.address,
      phone: createDto.phone,
      user: {
        name: createDto.name,
        email: createDto.email,
        password: hashedPassword,
        role: UserRole.CUSTOMER,
      },
    });
    const savedCustomer = await this.customerRepository.save(newCustomer);

    try {
      await this.mailerService.sendMail({
        to: savedCustomer.user.email, 
        subject: 'Welcome to FoodHouse!',
        text: `Hello ${savedCustomer.user.name},\n\nWelcome to FoodHouse! Your account has been successfully created. You can now log in and place your orders.\n\nBest Regards,\nThe FoodHouse Team`,
      });
      console.log('Welcome email sent successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
    return { message: "Customer registered successfully", customerId: savedCustomer.customerId };
  }
 
  async searchFood(item: string) {
    return { message: `Searching database for food item: ${item}` };
  }

  async getProfile(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { customerId: id },
      relations: ['user'], 
    });

    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return customer;
  }

  async replaceProfile(id: number, updateDto: UpdateCustomerDto) {
    const customer = await this.getProfile(id); 

    if (updateDto.address) customer.address = updateDto.address;
    if (updateDto.phone) customer.phone = updateDto.phone;
    if (updateDto.name) customer.user.name = updateDto.name;
    
    await this.customerRepository.save(customer);
    return { message: "Profile fully replaced", customer };
  }

  async patchProfile(id: number, updateDto: UpdateCustomerDto) {
    const customer = await this.getProfile(id);


    if (updateDto.address) customer.address = updateDto.address;
    if (updateDto.phone) customer.phone = updateDto.phone;
    if (updateDto.name) customer.user.name = updateDto.name;

    await this.customerRepository.save(customer);
    return { message: "Profile partially updated", customer };
  }

  async checkout(id: number, cartData: any) {
    const customer = await this.getProfile(id);

    const newOrder = this.orderRepository.create({
      total: cartData.totalPrice || 0, 
      status: 'PENDING',
      customer: customer,
    });

    const savedOrder = await this.orderRepository.save(newOrder);
    return { message: "Order placed successfully", orderId: savedOrder.orderId };
  }

  async getOrders(id: number) {
    const orders = await this.orderRepository.find({
      where: { customer: { customerId: id } },
    });
    return { message: "Orders fetched", totalOrders: orders.length, orders };
  }

  async cancelOrder(id: number, orderId: number) {
    const order = await this.orderRepository.findOne({ where: { orderId: orderId, customer: { customerId: id } } });
    
    if (!order) throw new NotFoundException(`Order #${orderId} not found for this customer`);

    await this.orderRepository.remove(order);
    
    return { message: `Order #${orderId} has been successfully deleted` };
  }

}