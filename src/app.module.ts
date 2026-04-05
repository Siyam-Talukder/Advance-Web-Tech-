import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { DBModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    CustomersModule, 
    DBModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root', 
      database: 'FoodHouse', 
      autoLoadEntities: true, 
      synchronize: true,
    }), AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'mdsiyamtalukder1@gmail.com', 
          pass: 'tifvzszektqpoqnc',    
        },
      },
      defaults: {
        from: '"FoodHouse Admin" <no-reply@foodhouse.com>',
      },
    }),
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}