import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  findAll() {
    return this.orderRepository.find()
  }

  async create(CreateOrderInput: CreateOrderInput): Promise<Order> {
    const o = new Order()
    o.shopId = CreateOrderInput.shopId
    o.totalPrice = CreateOrderInput.totalPrice
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    o.createdAt = currentDate;   
    o.soldProducts = CreateOrderInput.soldProducts
    await this.orderRepository.save(o)
    return o
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ comment: id });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  
    return order;
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
