import { Body, Get, Injectable, Post } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import * as qrcode from 'qrcode';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  @Post()
  async create(@Body() createTicketInput: CreateTicketInput): Promise<Ticket> {
    try {
      const t = new Ticket()
      const today = new Date()
      const usableDate = new Date(t.usableOn)
      usableDate.setHours(0,0,0,0)

      const validationId = new ObjectId()
      const qrCode = await this.generateQrCode(`https://ef5a-178-51-40-7.ngrok-free.app/ticket_detail?ticketId=${validationId}`)

      t.price = createTicketInput.price
      t.name = createTicketInput.name
      t.personId = createTicketInput.personId
      t.isActive = false
      t.validationId = validationId.toString()
      t.qrCode = qrCode
      t.usableOn = usableDate
      t.createdAt = new Date(today)
      t.updatedAt = new Date(today)

      return this.ticketRepository.save(t)
    }
    catch (error) {
      throw error
    }
    
  }

  @Post()
  async createTickets(@Body() createTicketsInput: CreateTicketInput[]): Promise<Ticket[]> {
    try {
      const today = new Date()

      const tickets = await Promise.all(createTicketsInput.map(async t => {
        const ticket = new Ticket()
        const usableDate = new Date(t.usableOn)
        usableDate.setHours(0,0,0,0)
        const validationId = new ObjectId()
        const qrCode = await this.generateQrCode(`https://ef5a-178-51-40-7.ngrok-free.app/ticket_detail?ticketId=${validationId}`)

        ticket.price = t.price
        ticket.name = t.name
        ticket.personId = t.personId
        ticket.isActive = false
        ticket.validationId = validationId.toString()
        ticket.qrCode = qrCode
        ticket.usableOn = usableDate
        ticket.createdAt = new Date(today)
        ticket.updatedAt = new Date(today)
        return ticket
      }))
      
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

  @Get(':validationId')
  findOneByValidationId(validationId: string): Promise<Ticket> {
    if (!ObjectId.isValid(validationId)) throw new Error('Invalid ObjectId')

    // @ts-ignore
    return this.ticketRepository.findOne({ where: { validationId: validationId }})
  }

  @Get(':id')
  findOne(@Body('id') id: string): Promise<Ticket> {
      if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')

      // @ts-ignore
      return this.ticketRepository.findOne({ _id: new ObjectId(id) })
  }

  @Post()
  async update(@Body() updateTicketInput: UpdateTicketInput): Promise<Ticket> {
    if (!ObjectId.isValid(updateTicketInput.id)) throw new Error('Invalid ObjectId')

    // @ts-ignore
    const ticket = await this.ticketRepository.findOne({ _id: new ObjectId(updateTicketInput.id) })

    if (!ticket) throw new Error('Ticket not found')
    if (ticket.validationId !== updateTicketInput.validationId && ticket.id !== updateTicketInput.id) throw new Error('Invalid ticket')
    
    const today = new Date()
    today.setHours(0,0,0,0)
    const usableDate = new Date(ticket.usableOn)
    usableDate.setHours(0,0,0,0)
    if (usableDate.getTime() !== today.getTime()) throw new Error('Ticket is not usable today')

    ticket.isActive = true
    ticket.updatedAt = new Date()

    return this.ticketRepository.save(ticket)
  }

  // remove(id: number) {
  //   return `This action removes a #${id} ticket`;
  // }

  // ------ extra functions ------

  async generateQrCode(data: string): Promise<string> {
    try {
      const qrCodeDataURL = await qrcode.toDataURL(data);
      return qrCodeDataURL;
    } catch (error) {
      throw new Error('Failed to generate QR code.');
    }
  }
}
