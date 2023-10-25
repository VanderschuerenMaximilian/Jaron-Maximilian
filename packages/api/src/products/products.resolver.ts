import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Stock } from 'src/stocks/entities/stock.entity';
import { StocksService } from 'src/stocks/stocks.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly StocksService: StocksService,
    ) {}


  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Query(() => Product, { name: 'productByName' })
  async getProductByName(
    @Args('name') name: string,
  ): Promise<Product | null> {
    return this.productsService.findByName(name)
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }

  @ResolveField(() => [Stock], { name: 'ingredients' })
  async getStockForProduct(@Parent() product: Product): Promise<Stock[]> {
    const ingredientName = product.ingredients;
    const ingredients = await Promise.all(
      ingredientName.map((ingredientName) => this.StocksService.findByName(ingredientName)),
    );

    return ingredients;
  }

  @ResolveField(() => [Stock], { name: 'sauce' })
  async getStockForProductSauce(@Parent() product: Product): Promise<Stock[]> {
    const sauceName = product.sauce;
    const sauces = await Promise.all(
      sauceName.map((sauceName) => this.StocksService.findByName(sauceName)),
    );
    
    return sauces;
  }

  @ResolveField(() => [Stock], { name: 'extra' })
  async getStockForProductExtra(@Parent() product: Product): Promise<Stock[]> {
    const extraName = product.extra;
    const extras = await Promise.all(
      extraName.map((extraName) => this.StocksService.findByName(extraName)),
    );

    return extras;
  }

}
