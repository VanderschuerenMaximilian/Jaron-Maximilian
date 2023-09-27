import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BezoekerService } from './bezoeker.service';
import { Bezoeker } from './entities/bezoeker.entity';
import { CreateBezoekerInput } from './dto/create-bezoeker.input';
import { UpdateBezoekerInput } from './dto/update-bezoeker.input';

@Resolver(() => Bezoeker)
export class BezoekerResolver {
  constructor(private readonly bezoekerService: BezoekerService) {}

  @Mutation(() => Bezoeker, {description: 'Create a bezoeker using the DTO.'})
  createBezoeker(
    @Args('createBezoekerInput') createBezoekerInput: CreateBezoekerInput,
  ): Promise<Bezoeker> {
    return this.bezoekerService.create(createBezoekerInput)
  }

  @Query(() => [Bezoeker], { name: 'bezoekers' })
  getBirds() {
    return this.bezoekerService.findAll()
  }

  @Query(() => Bezoeker, { name: 'bezoeker' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bezoekerService.findOne(id)
  }

  @Mutation(() => Bezoeker)
  updateBezoeker(
    @Args('updateBezoekerInput') updateBezoekerInput: UpdateBezoekerInput,
  ) {
    return this.bezoekerService.update(
      updateBezoekerInput.id,
      updateBezoekerInput,
    )
  }

  @Mutation(() => Bezoeker)
  removeBezoeker(@Args('id', { type: () => Int }) id: number) {
    return this.bezoekerService.remove(id)
  }
}