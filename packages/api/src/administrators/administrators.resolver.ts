import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdministratorsService } from './administrators.service';
import { Administrator } from './entities/administrator.entity';
import { CreateAdministratorInput } from './dto/create-administrator.input';
import { UpdateAdministratorInput } from './dto/update-administrator.input';

@Resolver(() => Administrator)
export class AdministratorsResolver {
  constructor(private readonly administratorsService: AdministratorsService) {}

  @Mutation(() => Administrator)
  createAdministrator(@Args('createAdministratorInput') createAdministratorInput: CreateAdministratorInput): Promise<Administrator> {
    return this.administratorsService.create(createAdministratorInput);
  }

  @Query(() => [Administrator], { name: 'administrators' })
  findAll() {
    return this.administratorsService.findAll();
  }

  @Query(() => Administrator, { name: 'administrator' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.administratorsService.findOne(id);
  }

  @Mutation(() => Administrator)
  updateAdministrator(@Args('updateAdministratorInput') updateAdministratorInput: UpdateAdministratorInput) {
    return this.administratorsService.update(updateAdministratorInput.id, updateAdministratorInput);
  }

  @Mutation(() => Administrator)
  removeAdministrator(@Args('id', { type: () => Int }) id: number) {
    return this.administratorsService.remove(id);
  }
}
