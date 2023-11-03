import { Injectable } from '@nestjs/common';
import { CreateTicketPriceInput } from './dto/create-ticket-price.input';
import { UpdateTicketPriceInput } from './dto/update-ticket-price.input';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketPrice } from './entities/ticket-price.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketPricesService {
  constructor(
    @InjectRepository(TicketPrice)
    private readonly ticketPriceRepository: Repository<TicketPrice>,
  ) {}

  create(createTicketPriceInput: CreateTicketPriceInput) {
    try {
      const tp = new TicketPrice()
      tp.price = createTicketPriceInput.price
      tp.name = createTicketPriceInput.name
      tp.description = createTicketPriceInput.description
      tp.createdAt = new Date()
      tp.updatedAt = new Date()

      return this.ticketPriceRepository.save(tp)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.ticketPriceRepository.find()
  }

  findOne(id: string) {
    return `This action returns a #${id} ticketPrice`;
  }

  update(id: number, updateTicketPriceInput: UpdateTicketPriceInput) {
    return `This action updates a #${id} ticketPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketPrice`;
  }

  // for seeding

  async saveAllTicketPrices(ticketPrices: TicketPrice[]) {
    return await this.ticketPriceRepository.save(ticketPrices)
  }

  async truncate () {
    return await this.ticketPriceRepository.clear()
  }
}
