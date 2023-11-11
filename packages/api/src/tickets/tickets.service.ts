import { Body, Injectable, Post } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { todo } from 'node:test';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  @Post()
  create(@Body() createTicketInput: CreateTicketInput): Promise<Ticket> {
    try {
      const t = new Ticket()
      const today = new Date()
      const expirationDate = new Date(today)
      expirationDate.setDate(today.getFullYear() + 1)

      t.price = createTicketInput.price
      t.name = createTicketInput.name
      t.isActive = false
      t.expirationDate = expirationDate
      t.createdAt = today
      t.updatedAt = today

      return this.ticketRepository.save(createTicketInput)
    }
    catch (error) {
      throw error
    }
    
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketInput: UpdateTicketInput) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
