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
  UseGuards 
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
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
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return await this.customersService.getProfile(id);
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
  @Post(':id/checkout')
  async checkout(
    @Param('id', ParseIntPipe) id: number, 
    @Body() cartData: any
  ) {
    return await this.customersService.checkout(id, cartData);
  }

  @UseGuards(AuthGuard)
  @Get(':id/orders')
  async getOrders(@Param('id', ParseIntPipe) id: number) {
    return await this.customersService.getOrders(id);
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