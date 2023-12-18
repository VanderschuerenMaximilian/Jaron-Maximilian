import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { ShopsService } from './shops.service';
import { Shop } from './entities/shop.entity';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard';
import { AllowedPersonTypes } from 'src/persons/decorators/personType.decorator';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { PersonTypeGuard } from 'src/persons/guards/personType.guard';

@Resolver(() => Shop)
export class ShopsResolver {
  constructor(
    private readonly shopsService: ShopsService,
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    
    ) {}

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Mutation(() => Shop)
  createShop(@Args('createShopInput') createShopInput: CreateShopInput) {
    return this.shopsService.create(createShopInput)
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Query(() => [Shop], { name: 'shops' })
  findAll() {
    return this.shopsService.findAll()
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Query(() => Shop, { name: 'shop' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shopsService.findOne(id)
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Query(() => Shop, { name: 'shopByName' })
  async getShopByName(@Args('name') name: string): Promise<Shop | null> {
    return this.shopsService.findByName(name)
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
  @Mutation(() => Shop)
  updateShop(@Args('updateShopInput') updateShopInput: UpdateShopInput) {
    return this.shopsService.update(updateShopInput.id, updateShopInput)
  }

  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @AllowedPersonTypes(IPersonType.ADMIN, IPersonType.MANAGER, IPersonType.EMPLOYEE)
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

  @ResolveField(() => [Product], { name: 'products' })
  async getProductsForShop(@Parent() shop: Shop): Promise<Product[]> {
    const productName = shop.products;
    const products = await Promise.all(
      productName.map((productName) => this.productsService.findByName(productName)),
    );

    return products;
  }

}
