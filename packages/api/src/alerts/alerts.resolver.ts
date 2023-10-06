import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AlertsService } from './alerts.service';
import { Alert } from './entities/alert.entity';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';

@Resolver(() => Alert)
export class AlertsResolver {
  constructor(private readonly alertsService: AlertsService) {}

  @Mutation(() => Alert)
  createAlert(@Args('createAlertInput') createAlertInput: CreateAlertInput) {
    return this.alertsService.create(createAlertInput);
  }

  @Query(() => [Alert], { name: 'alerts' })
  findAll() {
    return this.alertsService.findAll();
  }

  @Query(() => Alert, { name: 'alert' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.alertsService.findOne(id);
  }

  @Mutation(() => Alert)
  updateAlert(@Args('updateAlertInput') updateAlertInput: UpdateAlertInput) {
    return this.alertsService.update(updateAlertInput.id, updateAlertInput);
  }

  @Mutation(() => Alert)
  removeAlert(@Args('id', { type: () => Int }) id: number) {
    return this.alertsService.remove(id);
  }
}
