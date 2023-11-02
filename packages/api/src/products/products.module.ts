import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { StocksModule } from 'src/stocks/stocks.module';


@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [TypeOrmModule.forFeature([Product]), StocksModule],
  exports: [ProductsService],
})
export class ProductsModule {}
