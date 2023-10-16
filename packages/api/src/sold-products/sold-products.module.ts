import { Module } from '@nestjs/common';
import { SoldProductsService } from './sold-products.service';
import { SoldProductsResolver } from './sold-products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/shops/entities/shop.entity';
import { ShopsService } from 'src/shops/shops.service';
import { SoldProduct } from './entities/sold-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SoldProduct])],
  providers: [SoldProductsResolver, SoldProductsService],
  exports: [SoldProductsService],
})
export class SoldProductsModule {}
