import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SoldProductsService } from './sold-products.service';
import { SoldProduct } from './entities/sold-product.entity';
import { CreateSoldProductInput } from './dto/create-sold-product.input';
import { UpdateSoldProductInput } from './dto/update-sold-product.input';

@Resolver(() => SoldProduct)
export class SoldProductsResolver {
  constructor(private readonly soldProductsService: SoldProductsService) {}

  @Mutation(() => SoldProduct)
  createSoldProduct(@Args('createSoldProductInput') createSoldProductInput: CreateSoldProductInput) {
    return this.soldProductsService.create(createSoldProductInput);
  }

  @Query(() => [SoldProduct], { name: 'soldProducts' })
  findAll() {
    return this.soldProductsService.findAll();
  }

  @Query(() => SoldProduct, { name: 'soldProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.soldProductsService.findOne(id);
  }

  @Mutation(() => SoldProduct)
  updateSoldProduct(@Args('updateSoldProductInput') updateSoldProductInput: UpdateSoldProductInput) {
    return this.soldProductsService.update(updateSoldProductInput.id, updateSoldProductInput);
  }

  @Mutation(() => SoldProduct)
  removeSoldProduct(@Args('id', { type: () => Int }) id: number) {
    return this.soldProductsService.remove(id);
  }
}
