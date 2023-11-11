import { Body, Injectable, Post } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';


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
      expirationDate.setFullYear(today.getFullYear() + 1)

      t.price = createTicketInput.price
      t.name = createTicketInput.name
      t.personId = createTicketInput.personId
      t.isActive = false
      t.expiresAt = expirationDate
      t.createdAt = new Date(today)
      t.updatedAt = new Date(today)

      return this.ticketRepository.save(t)
    }
    catch (error) {
      throw error
    }
    
  }

  @Post()
  createTickets(@Body() createTicketsInput: CreateTicketInput[]): Promise<Ticket[]> {
    try {
      const today = new Date()
      const expirationDate = new Date(today)
      expirationDate.setFullYear(today.getFullYear() + 1)

      const tickets = createTicketsInput.map(t => {
        const ticket = new Ticket()
        ticket.price = t.price
        ticket.name = t.name
        ticket.personId = t.personId
        ticket.isActive = false
        ticket.expiresAt = expirationDate
        ticket.createdAt = new Date(today)
        ticket.updatedAt = new Date(today)
        return ticket
      })

      return this.ticketRepository.save(tickets)
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
