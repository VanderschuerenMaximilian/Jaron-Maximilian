import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsResolver } from './shops.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { CategoriesModule } from '../categories/categories.module';


@Module({
  providers: [ShopsResolver, ShopsService],
  imports: [TypeOrmModule.forFeature([Shop]), CategoriesModule],
  exports: [ShopsService],
})
export class ShopsModule {}
