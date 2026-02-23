import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('register')
  register(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.register(createCustomerDto);
  }

  @Get('search')
  searchFood(@Query('item') item: string) {
    return this.customersService.searchFood(item);
  }

  @Get(':id/profile')
  getProfile(@Param('id') id: string) {
    return this.customersService.getProfile(id);
  }

  @Put(':id/profile')
  replaceProfile(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.replaceProfile(id, updateCustomerDto);
  }

  @Patch(':id/profile')
  patchProfile(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.patchProfile(id, updateCustomerDto);
  }

  @Post(':id/checkout')
  checkout(@Param('id') id: string, @Body() cartData: any) {
    return this.customersService.checkout(id, cartData);
  }

  @Get(':id/orders')
  getOrders(@Param('id') id: string) {
    return this.customersService.getOrders(id);
  }

  @Delete(':id/orders/:orderId')
  cancelOrder(@Param('id') id: string, @Param('orderId') orderId: string) {
    return this.customersService.cancelOrder(id, orderId);
  }
}