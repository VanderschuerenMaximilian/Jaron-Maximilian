import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientInput } from './dto/update-ingredient.input';

@Resolver(() => Ingredient)
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Mutation(() => Ingredient)
  createIngredient(@Args('createIngredientInput') createIngredientInput: CreateIngredientInput) {
    return this.ingredientsService.create(createIngredientInput);
  }

  @Mutation(() => Ingredient)
  async updateIngredientStock(
    @Args('name') name: string,
    @Args('stock', { type: () => Int }) stock: number,
  ): Promise<Ingredient> {
    return await this.ingredientsService.updateStockByName(name, stock);
  }

  

  @Query(() => [Ingredient], { name: 'ingredients' })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Query(() => Ingredient, { name: 'ingredientByName' })
  async getIngredientByName(
    @Args('name') name: string,
  ): Promise<Ingredient | null> {
    return this.ingredientsService.findByName(name)
  }

  @Query(() => Ingredient, { name: 'ingredient' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ingredientsService.findOne(id);
  }

  @Mutation(() => Ingredient)
  updateIngredient(@Args('updateIngredientInput') updateIngredientInput: UpdateIngredientInput) {
    return this.ingredientsService.update(updateIngredientInput.id, updateIngredientInput);
  }

  @Mutation(() => Ingredient)
  removeIngredient(@Args('id', { type: () => Int }) id: number) {
    return this.ingredientsService.remove(id);
  }
}
