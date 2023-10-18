import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { ProductsService } from 'src/products/products.service';
import { IngredientsService } from 'src/ingredients/ingredients.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly ingredientService: IngredientsService,
    ) {}

  @Mutation(() => Order)
  async createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
      const order = await this.ordersService.create(createOrderInput);
      // Update de voorraad na het maken van de bestelling
      for (const product of createOrderInput.soldProducts) {
          await this.productsService.findByName(product.productName).then(async (p) => {
            for (const ingredient of p.ingredients) {
              await this.ingredientService.findByName(ingredient)
                .then(async (i) => {
                  i.stock = i.stock - i.stockReduction;
                  // TODO: ❗ wachten met drank eerst burgers uitwerken. Als het een drankje is moet hij krijgen wat de grote is en dan de stock verminderen adhv die grote 
                  // TODO: Je moet er ook voor zorgen dat het niet onder 0 kan gaan door controle te doen of er nog genoeg ingredienten zijn voor die hamburger (in de frontend)
                  // TODO: zorg ook dat hij de extras er af doet en de removables niet
                  await this.ingredientService.updateStockByName(i.name, i.stock);
                });
            }
        })
      }
      return order;
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.findOne(id);
  }


  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.remove(id);
  }
}
