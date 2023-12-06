import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    TicketsModule,
    PersonsModule,
  ],
  providers: [TicketsResolver, TicketsService],
})
export class TicketsModule {}
