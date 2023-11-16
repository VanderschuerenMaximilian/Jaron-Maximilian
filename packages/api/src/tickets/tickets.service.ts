import { Body, Get, Injectable, Post } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';


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
      const usableDate = new Date(t.usableOn)
      usableDate.setHours(0,0,0,0)

      t.price = createTicketInput.price
      t.name = createTicketInput.name
      t.personId = createTicketInput.personId
      t.isActive = false
      t.usableOn = usableDate
      t.createdAt = new Date(today)
      t.updatedAt = new Date(today)
      t.qrCode = createTicketInput.qrCode

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

      const tickets = createTicketsInput.map(t => {
        const ticket = new Ticket()
        const usableDate = new Date(t.usableOn)
        usableDate.setHours(0,0,0,0)

        ticket.price = t.price
        ticket.name = t.name
        ticket.personId = t.personId
        ticket.isActive = false
        ticket.qrCode = t.qrCode
        ticket.usableOn = usableDate
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

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find()
  }

  @Get(':personId')
  findAllByPersonId(personId: string): Promise<Ticket[]> {
    if (!ObjectId.isValid(personId)) throw new Error('Invalid ObjectId')

    // @ts-ignore
    return this.ticketRepository.find({ where: { personId: personId, isActive: false } })
  }

  @Get(':id')
  findOne(@Body('id') id: string): Promise<Ticket> {
      if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')

      // @ts-ignore
      return this.ticketRepository.findOne({ _id: new ObjectId(id) })
  }

  @Post()
  async update(@Body('id') id: string) {
    if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')

    // @ts-ignore
    const ticket = await this.ticketRepository.findOne({ _id: new ObjectId(id) })

    if (!ticket) throw new Error('Ticket not found')

    if (ticket.isActive) throw new Error('Ticket already used')
    else ticket.isActive = true, ticket.updatedAt = new Date()

    return this.ticketRepository.save(ticket)
  }

  // remove(id: number) {
  //   return `This action removes a #${id} ticket`;
  // }
}
