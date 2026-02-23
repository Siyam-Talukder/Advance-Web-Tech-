import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';


@Module({
  imports: [CustomersModule ],
  controllers: [AppController, CustomersController],
  providers: [AppService,CustomersService],
})
export class AppModule {}
