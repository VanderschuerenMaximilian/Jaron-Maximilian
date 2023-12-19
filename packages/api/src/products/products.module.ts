import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { StocksModule } from 'src/stocks/stocks.module';
import { PersonsModule } from 'src/persons/persons.module';


@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [TypeOrmModule.forFeature([Product]), StocksModule, PersonsModule],
  exports: [ProductsService],
})
export class ProductsModule {}
