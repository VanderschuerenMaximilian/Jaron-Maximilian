import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksResolver } from './stocks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [StocksResolver, StocksService],
  exports: [StocksService],
})
export class StocksModule {}
