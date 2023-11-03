import { Module } from '@nestjs/common';
import { TicketPricesService } from './ticket-prices.service';
import { TicketPricesResolver } from './ticket-prices.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketPrice } from './entities/ticket-price.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketPrice]),
  ],
  providers: [TicketPricesResolver, TicketPricesService],
  exports: [TicketPricesService]
})
export class TicketPricesModule {}
