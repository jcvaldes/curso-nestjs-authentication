import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../entities/order.entity';
import { OrderItem } from './../entities/order-item.entity';
import { Product } from './../../products/entities/product.entity';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productRepo.findOne(data.productId);
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.itemRepo.save(item);
  }
  async removeItem(orderId: number, productId: number) {
    // const item = await this.itemRepo.find({ orderId, productId });
    // return this.productRepo.save(product);
  }
  async addItem(productId: number, categoryId: number) {
    // const product = await this.productRepo.findOne(productId, {
    //   relations: ['categories'],
    // });
    // const category = await this.categoryRepo.findOne(categoryId);
    // const idx = product.categories.findIndex((c) => c.id === categoryId);
    // if (idx === -1 && category) {
    //   product.categories.push(category);
    //   return this.productRepo.save(product);
    // }
  }
}
