import { Resolver, Query, Mutation, Args, Int  } from '@nestjs/graphql';
import { ZonesService } from './zones.service';
import { Zone } from './entities/zone.entity';
import { CreateZoneInput } from './dto/create-zone.input';
import { UpdateZoneInput } from './dto/update-zone.input';
import { AllowedPersonTypes } from 'src/persons/decorators/personType.decorator';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { PersonTypeGuard } from 'src/persons/guards/personType.guard';

@Resolver(() => Zone)
export class ZonesResolver {
  constructor(private readonly zonesService: ZonesService) {}

  @AllowedPersonTypes(IPersonType.ADMIN)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Mutation(() => Zone)
  createZone(@Args('createZoneInput') createZoneInput: CreateZoneInput) {
    return this.zonesService.create(createZoneInput);
  }

  @Query(() => [Zone], { name: 'zones' })
  findAll() {
    return this.zonesService.findAll();
  }

  @Query(() => Zone, { name: 'zone' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.zonesService.findOne(id);
  }

  // @Mutation(() => Zone)
  // updateZone(@Args('updateZoneInput') updateZoneInput: UpdateZoneInput) {
  //   return this.zonesService.update(updateZoneInput.id, updateZoneInput);
  // }

  // @Mutation(() => Zone)
  // removeZone(@Args('id', { type: () => Int }) id: number) {
  //   return this.zonesService.remove(id);
  // }
}
