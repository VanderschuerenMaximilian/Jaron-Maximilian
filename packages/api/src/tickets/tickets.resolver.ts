import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  @Mutation(() => Ticket)
  createTicket(@Args('createTicketInput') createTicketInput: CreateTicketInput) {
    return this.ticketsService.create(createTicketInput);
  }

  @Mutation(() => [Ticket])
  createTickets(@Args('createTicketsInput', { type: () => [CreateTicketInput] }) createTicketsInput: CreateTicketInput[] ) {
    return this.ticketsService.createTickets(createTicketsInput);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Query(() => [Ticket], { name: 'ticketsByPersonId' })
  findAllByPersonId(@Args('personId', { type: () => String }) personId: string) {
    return this.ticketsService.findAllByPersonId(personId);
  }

  @Query(() => Ticket, { name: 'ticketByValidationId' })
  findOneByValidationId(@Args('validationId', { type: () => String }) validationId: string) {
    return this.ticketsService.findOneByValidationId(validationId);
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('ticketId', { type: () => String }) id: string) {
    return this.ticketsService.findOne(id);
  }

  @Mutation(() => Ticket)
  updateTicket(@Args('updateTicketInput') updateAlertInput: UpdateTicketInput) {
    return this.ticketsService.update(updateAlertInput);
  }

  // @Mutation(() => Ticket)
  // removeTicket(@Args('id', { type: () => Int }) id: number) {
  //   return this.ticketsService.remove(id);
  // }
}
