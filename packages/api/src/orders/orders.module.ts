import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductsModule } from 'src/products/products.module';
import { StocksModule } from 'src/stocks/stocks.module';


@Module({
  providers: [OrdersResolver, OrdersService],
  imports: [TypeOrmModule.forFeature([Order]), ProductsModule, StocksModule],
  exports: [OrdersService],
})
export class OrdersModule {}
