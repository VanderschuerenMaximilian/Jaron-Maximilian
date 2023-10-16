import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepository.find()
  }

  create(CreateOrderInput: CreateOrderInput): Promise<Order> {
    const o = new Order()
    o.shopId = CreateOrderInput.shopId
    o.createdAt = new Date()
    o.soldProducts = CreateOrderInput.soldProducts
    return this.orderRepository.save(o)
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  // seeding logic

  saveAllOrders(orders: Order[]) {
    return this.orderRepository.save(orders)
  }

  truncate() {
    return this.orderRepository.clear()
  }
}
