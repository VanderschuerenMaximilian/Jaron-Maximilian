import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard';
import { UseGuards } from '@nestjs/common';
import { AllowedPersonTypes } from 'src/persons/decorators/personType.decorator';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { PubSub } from 'graphql-subscriptions';
import { FirebaseUser } from 'src/authentication/decorators/user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { PersonTypeGuard } from 'src/persons/guards/personType.guard';

const pubSub = new PubSub()

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(
    private readonly ticketsService: TicketsService,
    ) {}

  @Mutation(() => [Ticket])
  createTickets(
    @Args('createTicketsInput', { type: () => [CreateTicketInput] }) createTicketsInput: CreateTicketInput[],
    @FirebaseUser() currentUser: UserRecord
  ) {
    const tickets = this.ticketsService.createTickets(createTicketsInput, currentUser);
    pubSub.publish('ticketsAdded', { ticketsAdded: tickets })
    return tickets
  }

  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Query(() => [Ticket], { name: 'tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Ticket], { name: 'ticketsByPersonId' })
  findAllByPersonId(@Args('personId', { type: () => String }) personId: string,
  @Args('orderBy', { type: () => String, nullable: true }) orderBy: string) {
    return this.ticketsService.findAllByPersonId(personId, orderBy);
  }

  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Query(() => Ticket, { name: 'ticketByValidationId' })
  findOneByValidationId(@Args('validationId', { type: () => String }) validationId: string) {
    return this.ticketsService.findOneByValidationId(validationId);
  }

  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('ticketId', { type: () => String }) id: string) {
    return this.ticketsService.findOne(id);
  }

  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Mutation(() => Ticket)
  updateTicket(@Args('updateTicketInput') updateAlertInput: UpdateTicketInput) {
    return this.ticketsService.update(updateAlertInput);
  }

  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Mutation(() => Ticket)
  removeTicket(@Args('id', { type: () => String }) id: string) {
    return this.ticketsService.remove(id);
  }
  
  @AllowedPersonTypes(IPersonType.VISITOR)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Subscription(() => [Ticket])
  ticketsAdded() {
    return pubSub.asyncIterator('ticketsAdded')
  }
}
