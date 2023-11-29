import { Body, Delete, Get, Injectable, Post } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import * as qrcode from 'qrcode';
// import { MailerService } from '@nestjs-modules/mailer';
import { UserRecord } from 'firebase-admin/auth';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: MongoRepository<Ticket>,
    // private readonly mailerService: MailerService,
  ) {}

  @Post()
  async createTickets(@Body() createTicketsInput: CreateTicketInput[], currentUser: UserRecord): Promise<Ticket[]> {
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
        // this.sendTicketVerificationMail(currentUser.email)
        // this.sendTicketVerificationMail('bearbanner00@gmail.com')
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
  async findAllByPersonId(personId: string, orderBy: string): Promise<Ticket[]> {
    if (!ObjectId.isValid(personId)) throw new Error('Invalid ObjectId')

    const tickets = await this.ticketRepository.find({ where: { personId: personId, isActive: false } })
    if (orderBy === 'usableOn_ASC') {
      return tickets.sort((a, b) => a.usableOn.getTime() - b.usableOn.getTime())
    } else if (orderBy === 'usableOn_DESC') {
      return tickets.sort((a, b) => b.usableOn.getTime() - a.usableOn.getTime())
    } else {
      return tickets
    }
  }

  @Get(':validationId')
  findOneByValidationId(validationId: string): Promise<Ticket> {
    if (!ObjectId.isValid(validationId)) throw new Error('Invalid ObjectId')

    return this.ticketRepository.findOne({ where: { validationId: validationId }})
  }

  @Get(':id')
  findOne(@Body('id') id: string): Promise<Ticket> {
      if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')

      //@ts-ignore
      return this.ticketRepository.findOne({ _id: new ObjectId(id) })
  }

  @Post()
  async update(@Body() updateTicketInput: UpdateTicketInput): Promise<Ticket> {
    if (!ObjectId.isValid(updateTicketInput.id)) throw new Error('Invalid ObjectId')

    //TODO: why does mongoRepository not fix ts error?
    //@ts-ignore
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

  @Delete(':id')
  async remove(id: string) {
    try {
      const alert = await this.ticketRepository.delete(id);
      
      return alert
    } catch (error) {
      throw error
    }
  }

  // ------ extra functions ------

  async generateQrCode(data: string): Promise<string> {
    try {
      const qrCodeDataURL = await qrcode.toDataURL(data);
      return qrCodeDataURL;
    } catch (error) {
      throw new Error('Failed to generate QR code.');
    }
  }

  // sendTicketVerificationMail(receivingMail: string): void {
  //   this.mailerService.sendMail({
  //     to: receivingMail,
  //     from: 'bellewaerde@hulp.be',
  //     subject: 'Ticket verification',
  //     text: 'You succesfully bought tickets!',
  //     html: '<b>You succesfully bought tickets!</b>',
  //   })
  // }
}
