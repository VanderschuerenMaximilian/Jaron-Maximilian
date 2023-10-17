import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductsModule } from 'src/products/products.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';


@Module({
  providers: [OrdersResolver, OrdersService],
  imports: [TypeOrmModule.forFeature([Order]), ProductsModule, IngredientsModule],
  exports: [OrdersService],
})
export class OrdersModule {}
