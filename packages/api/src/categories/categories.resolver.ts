import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard';
import { AllowedPersonTypes } from 'src/persons/decorators/personType.decorator';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { PersonTypeGuard } from 'src/persons/guards/personType.guard';


@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}
  
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoriesService.create(createCategoryInput)
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoriesService.findAll()
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id)
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Query(() => Category, { name: 'categoryByName' })
  async getCategoryByName(
    @Args('name') name: string,
  ): Promise<Category | null> {
    return this.categoriesService.findByName(name)
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    )
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id)
  }
}
