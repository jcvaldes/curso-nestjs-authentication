import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';

import { UsersController } from './controllers/users.controller';
import { ProductsModule } from '../products/products.module';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemService } from './services/order-item.service';
import { OrderItemController } from './controllers/order-item.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    OrderItemController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrderItemService],
})
export class UsersModule {}
