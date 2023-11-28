import { Resolver, Query, Mutation, Args, ID, Subscription } from '@nestjs/graphql';
import { AlertsService } from './alerts.service';
import { Alert } from './entities/alert.entity';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard';
import { FirebaseUser } from 'src/authentication/decorators/user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { AllowedPersonTypes } from 'src/persons/decorators/personType.decorator';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { PubSub } from 'graphql-subscriptions';
import { SingleFieldSubscriptionsRule } from 'graphql';

const pubSub = new PubSub()

@Resolver(() => Alert)
export class AlertsResolver {
  constructor(private readonly alertsService: AlertsService) {}

  @UseGuards(FirebaseGuard)
  @Mutation(() => Alert)
  async createAlert(@Args('createAlertInput') createAlertInput: CreateAlertInput) {
    try {
      const alert = await this.alertsService.create(createAlertInput);
      pubSub.publish('alertAdded', { alertAdded: alert })
      return alert
    }
    catch (error) {
      return error
    }
  }

  @Query(() => [Alert], { name: 'alerts' })
  findAll() {
    return this.alertsService.findAll();
  }

  @Query(() => Alert, { name: 'alert' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.alertsService.findOneById(id);
  }

  @Query(() => [Alert], { name: 'nonResolvedAlertsByEmployee' })
  findNonResolvedAlertsByEmployee(@Args('employeeId', { type: () => String }) employeeId: string) {
    return this.alertsService.findNonResolvedAlertsByEmployee(employeeId);
  }

  @Query(() => [Alert], { name: 'nonAssignedAlerts' })
  findNonAssignedAlerts() {
    return this.alertsService.findNonAssignedAlerts();
  }

  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @UseGuards(FirebaseGuard)
  @Mutation(() => Alert)
  updateAlert(
    @Args('updateAlertInput') updateAlertInput: UpdateAlertInput,
  ) {
    try {
      return this.alertsService.update(updateAlertInput);
    }
    catch (error) {
      console.log(error)
      return error
    }
  }

  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER)
  @UseGuards(FirebaseGuard)
  @Mutation(() => Alert)
  addPersonToAlert(@Args('alertId', { type: () => String }) alertId: string, 
    @Args('personId', { type: () => String }) personId: string, 
  ) {
    try {
      const assignedPerson = this.alertsService.addPersonToAlert(alertId, personId);
      pubSub.publish('personAssignedToAlert', { personAssignedToAlert: assignedPerson })
      return assignedPerson
    }
    catch (error) {
      console.log(error)
      return error
    }
  }

  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER)
  @UseGuards(FirebaseGuard)
  @Mutation(() => Alert)
  removeAlert(@Args('id', { type: () => ID }) id: string) {
    return this.alertsService.remove(id);
  }

  @Subscription(() => Alert)
  alertAdded() {
    return pubSub.asyncIterator('alertAdded')
  }

  @Subscription(() => Alert)
  personAssignedToAlert() {
    return pubSub.asyncIterator('personAssignedToAlert')
  }
}
