import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { ShopsService } from './shops.service';
import { Shop } from './entities/shop.entity';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';

@Resolver(() => Shop)
export class ShopsResolver {
  constructor(
    private readonly shopsService: ShopsService,
    private readonly categoriesService: CategoriesService
    
    ) {}

  @Mutation(() => Shop)
  createShop(@Args('createShopInput') createShopInput: CreateShopInput) {
    return this.shopsService.create(createShopInput)
  }

  @Query(() => [Shop], { name: 'shops' })
  findAll() {
    return this.shopsService.findAll()
  }

  @Query(() => Shop, { name: 'shop' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shopsService.findOne(id)
  }

  @Query(() => Shop, { name: 'shopByName' })
  async getShopByName(@Args('name') name: string): Promise<Shop | null> {
    return this.shopsService.findByName(name)
  }

  @Mutation(() => Shop)
  updateShop(@Args('updateShopInput') updateShopInput: UpdateShopInput) {
    return this.shopsService.update(updateShopInput.id, updateShopInput)
  }

  @Mutation(() => Shop)
  removeShop(@Args('id', { type: () => Int }) id: number) {
    return this.shopsService.remove(id)
  }

  @ResolveField(() => [Category], { name: 'category' })
  async getCategoryForShop(@Parent() shop: Shop): Promise<Category[]> {
    const categoryName = shop.category;
    const categories = await Promise.all(
      categoryName.map((categoryName) => this.categoriesService.findByName(categoryName)),
    );

    return categories;
  }
}
