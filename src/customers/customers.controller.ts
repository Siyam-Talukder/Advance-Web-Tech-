import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Patch, 
  Delete, 
  Param, 
  Body, 
  Query, 
  UsePipes, 
  ValidationPipe, 
  ParseIntPipe, 
  UseGuards,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.register(createCustomerDto);
  }

  @UseGuards(AuthGuard)
  @Get('search')
  async searchFood(@Query('item') item: string) {
    return await this.customersService.searchFood(item);
  }

  @UseGuards(AuthGuard)
  @Get(':id/profile')
  async getProfile(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const customer = await this.customersService.getProfile(id);
    
    if (customer.user.email !== req.user.email) {
      throw new UnauthorizedException("Access Denied: You cannot view someone else's profile.");
    }
    return customer;
  }

  @UseGuards(AuthGuard)
  @Put(':id/profile')
  @UsePipes(new ValidationPipe())
  async replaceProfile(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return await this.customersService.replaceProfile(id, updateCustomerDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/profile')
  @UsePipes(new ValidationPipe())
  async patchProfile(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return await this.customersService.patchProfile(id, updateCustomerDto);
  }

  @UseGuards(AuthGuard)
  @Post(':id/orders')
  @UsePipes(new ValidationPipe())
  async placeOrder(
    @Param('id', ParseIntPipe) id: number, 
    @Body() createOrderDto: CreateOrderDto
  ) {
    return await this.customersService.placeOrder(id, createOrderDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id/orders')
  async getOrders(@Param('id', ParseIntPipe) id: number) {
    return await this.customersService.getOrders(id);
  }

  @UseGuards(AuthGuard)
  @Get('orders/:orderId')
  async checkOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return await this.customersService.getOrderDetails(orderId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/orders/:orderId')
  async cancelOrder(
    @Param('id', ParseIntPipe) id: number, 
    @Param('orderId', ParseIntPipe) orderId: number
  ) {
    return await this.customersService.cancelOrder(id, orderId);
  }
}