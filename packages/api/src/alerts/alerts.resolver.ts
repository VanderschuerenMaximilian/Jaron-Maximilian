import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { AlertsService } from './alerts.service';
import { Alert } from './entities/alert.entity';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';
import { ObjectId } from 'mongodb';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard';
import { FirebaseUser } from 'src/authentication/decorators/user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { UpdatePersonInput } from 'src/persons/dto/update-person.input';
import { Person } from 'src/persons/entities/person.entity';

@Resolver(() => Alert)
export class AlertsResolver {
  constructor(private readonly alertsService: AlertsService) {}

  @Mutation(() => Alert)
  createAlert(@Args('createAlertInput') createAlertInput: CreateAlertInput) {
    try {
      return this.alertsService.create(createAlertInput);
    }
    catch (error) {
      console.log(error)
      return error
    }
  }

  @Query(() => [Alert], { name: 'alerts' })
  findAll() {
    return this.alertsService.findAll();
  }

  @Query(() => Alert, { name: 'alert' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.alertsService.findOne(id);
  }

  // @UseGuards(FirebaseGuard)
  @Mutation(() => Alert)
  updateAlert(@Args('updateAlertInput') updateAlertInput: UpdateAlertInput,
    @Args('id', { type: () => String }) id: string, 
  ) {
    try {
      return this.alertsService.update(id, updateAlertInput);
    }
    catch (error) {
      console.log(error)
      return error
    }
  }

  @Mutation(() => Alert)
  addPersonToAlert(@Args('alertId', { type: () => String }) alertId: string, 
    @Args('personId', { type: () => String }) personId: string, 
  ) {
    try {
      return this.alertsService.addPersonToAlert(alertId, personId);
    }
    catch (error) {
      console.log(error)
      return error
    }
  }

  @Mutation(() => Alert)
  removeAlert(@Args('id', { type: () => Int }) id: number) {
    return this.alertsService.remove(id);
  }
}
