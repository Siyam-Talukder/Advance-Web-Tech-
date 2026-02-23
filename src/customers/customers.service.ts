import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  
  register(createDto: CreateCustomerDto) {
    return { message: "Customer registered", data: createDto };
  }

  searchFood(item: string) {
    return { message: "Search results", searchedFor: item };
  }

  getProfile(id: string) {
    return { message: "Profile fetched", customerId: id };
  }

  replaceProfile(id: string, updateDto: UpdateCustomerDto) {
    return { message: "Profile fully replaced", customerId: id, data: updateDto };
  }

  patchProfile(id: string, updateDto: UpdateCustomerDto) {
    return { message: "Profile partially updated", customerId: id, updatedFields: updateDto };
  }

  checkout(id: string, cartData: any) {
    return { message: "Order placed", customerId: id, order: cartData };
  }

  getOrders(id: string) {
    return { message: "Active and past orders fetched", customerId: id, orders: [] };
  }

  cancelOrder(id: string, orderId: string) {
    return { message: "Order cancelled successfully", customerId: id, orderId: orderId };
  }
}