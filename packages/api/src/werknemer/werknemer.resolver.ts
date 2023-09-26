import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WerknemerService } from './werknemer.service';
import { Werknemer } from './entities/werknemer.entity';
import { CreateWerknemerInput } from './dto/create-werknemer.input';
import { UpdateWerknemerInput } from './dto/update-werknemer.input';

@Resolver(() => Werknemer)
export class WerknemerResolver {
  constructor(private readonly werknemerService: WerknemerService) {}

  @Mutation(() => Werknemer)
  createWerknemer(@Args('createWerknemerInput') createWerknemerInput: CreateWerknemerInput): Promise<Werknemer> {
    return this.werknemerService.create(createWerknemerInput);
  }

  @Query(() => [Werknemer], { name: 'werknemers' })
  findAll() {
    return this.werknemerService.findAll();
  }

  @Query(() => Werknemer, { name: 'werknemer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.werknemerService.findOne(id);
  }

  @Mutation(() => Werknemer)
  updateWerknemer(@Args('updateWerknemerInput') updateWerknemerInput: UpdateWerknemerInput) {
    return this.werknemerService.update(updateWerknemerInput.id, updateWerknemerInput);
  }

  @Mutation(() => Werknemer)
  removeWerknemer(@Args('id', { type: () => Int }) id: number) {
    return this.werknemerService.remove(id);
  }
}
