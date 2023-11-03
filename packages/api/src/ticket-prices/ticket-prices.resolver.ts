import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketPricesService } from './ticket-prices.service';
import { TicketPrice } from './entities/ticket-price.entity';
import { CreateTicketPriceInput } from './dto/create-ticket-price.input';
import { UpdateTicketPriceInput } from './dto/update-ticket-price.input';

@Resolver(() => TicketPrice)
export class TicketPricesResolver {
  constructor(private readonly ticketPricesService: TicketPricesService) {}

  @Mutation(() => TicketPrice)
  createTicketPrice(@Args('createTicketPriceInput') createTicketPriceInput: CreateTicketPriceInput) {
    return this.ticketPricesService.create(createTicketPriceInput);
  }

  @Query(() => [TicketPrice], { name: 'ticketPrices' })
  findAll() {
    return this.ticketPricesService.findAll();
  }

  @Query(() => TicketPrice, { name: 'ticketPrice' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.ticketPricesService.findOne(id);
  }

  @Mutation(() => TicketPrice)
  updateTicketPrice(@Args('updateTicketPriceInput') updateTicketPriceInput: UpdateTicketPriceInput) {
    return this.ticketPricesService.update(updateTicketPriceInput.id, updateTicketPriceInput);
  }

  @Mutation(() => TicketPrice)
  removeTicketPrice(@Args('id', { type: () => Int }) id: number) {
    return this.ticketPricesService.remove(id);
  }
}
