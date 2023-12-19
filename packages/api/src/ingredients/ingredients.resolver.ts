import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientInput } from './dto/update-ingredient.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard';
import { AllowedPersonTypes } from 'src/persons/decorators/personType.decorator';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { PersonTypeGuard } from 'src/persons/guards/personType.guard';

@Resolver(() => Ingredient)
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Mutation(() => Ingredient)
  createIngredient(@Args('createIngredientInput') createIngredientInput: CreateIngredientInput) {
    return this.ingredientsService.create(createIngredientInput);
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Mutation(() => Ingredient)
  async updateIngredientStock(
    @Args('name') name: string,
    @Args('stock', { type: () => Int }) stock: number,
  ): Promise<Ingredient> {
    return await this.ingredientsService.updateStockByName(name, stock);
  }

  
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Query(() => [Ingredient], { name: 'ingredients' })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Query(() => Ingredient, { name: 'ingredientByName' })
  async getIngredientByName(
    @Args('name') name: string,
  ): Promise<Ingredient | null> {
    return this.ingredientsService.findByName(name)
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Query(() => Ingredient, { name: 'ingredient' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ingredientsService.findOne(id);
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Mutation(() => Ingredient)
  updateIngredient(@Args('updateIngredientInput') updateIngredientInput: UpdateIngredientInput) {
    return this.ingredientsService.update(updateIngredientInput.id, updateIngredientInput);
  }
  
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Mutation(() => Ingredient)
  removeIngredient(@Args('id', { type: () => Int }) id: number) {
    return this.ingredientsService.remove(id);
  }
}
