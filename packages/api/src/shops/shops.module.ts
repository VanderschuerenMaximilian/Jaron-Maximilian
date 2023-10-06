import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsResolver } from './shops.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';

@Module({
  providers: [ShopsResolver, ShopsService],
  imports: [TypeOrmModule.forFeature([Shop])],
  exports: [ShopsService],
})
export class ShopsModule {}
