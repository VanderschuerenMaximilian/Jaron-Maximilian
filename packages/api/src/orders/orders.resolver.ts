import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { ProductsService } from 'src/products/products.service';
import { StocksService } from 'src/stocks/stocks.service';
import { SoldProduct } from 'src/sold-products/entities/sold-product.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly stocksService: StocksService,
  ) {}

    @Mutation(() => Order)
    async createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {      
      try {
        const totalIngredients: Record<string, number> = {};

        // Add all ingredients, extras, removeables and sauces to the totalIngredients list
        for (const product of createOrderInput.soldProducts) {
          const p = await this.productsService.findByName(product.productName);
          if (p.category !== "Drinks") {
            for (const ingredient of p.ingredients) {
              if (totalIngredients[ingredient]) {
                totalIngredients[ingredient] += product.amount;
              } else {
                totalIngredients[ingredient] = product.amount;
              }
            }
            for (const extra of product.extras) {
              if (totalIngredients[extra]) {
                totalIngredients[extra] += product.amount;
              }
              else {
                totalIngredients[extra] = product.amount;
              }
            }
            if (product.sauce != 'No Sauce') {
              if (totalIngredients[product.sauce]) {
                totalIngredients[product.sauce] += 25 * product.amount;
              }
              else {
                totalIngredients[product.sauce] = 25 * product.amount;
              }
            }
            for (const removeable of product.removeables) {
              if (totalIngredients[removeable]) {
                totalIngredients[removeable] -= product.amount;
              }
            }
          }
          if (p.category == "Drinks") {
            for (const ingredient of p.ingredients) {
              if (totalIngredients[ingredient]) {
                if (product.size == "Small") {
                  totalIngredients[ingredient] += (200 * product.amount);
                }
                if (product.size == "Medium") {
                  totalIngredients[ingredient] += (250 * product.amount);
                }
                if (product.size == "Large") {
                  totalIngredients[ingredient] += (300 * product.amount);
                }
              } else {
                if (product.size == "Small") {
                  totalIngredients[ingredient] = (200 * product.amount);
                }
                if (product.size == "Medium") {
                  totalIngredients[ingredient] = (250 * product.amount);
                }
                if (product.size == "Large") {
                  totalIngredients[ingredient] = (300 * product.amount);
                }
              }
            }
          }
        }

        // Check if there is enough stock for all products in the order
        for (const ingredient of Object.keys(totalIngredients)) {
          const stockItem = await this.stocksService.findByName(ingredient);
          if (stockItem.stock < totalIngredients[ingredient]) {
            throw new Error(`Onvoldoende voorraad voor ingrediënt: ${ingredient}`);
          }
        }

        // Update the stock of all ingredients, extras, removeables and sauces of all products in the order
        for (const ingredient of Object.keys(totalIngredients)) {
          const stockItem = await this.stocksService.findByName(ingredient);
          stockItem.stock = stockItem.stock - totalIngredients[ingredient];
          await this.stocksService.updateStockByName(stockItem.name, stockItem.stock);
        }

        // Create the order
        const order = await this.ordersService.create(createOrderInput);
        return order;


      } 
      catch (error) {
        throw new Error(`Fout bij verwerken order: ${error.message}`);
      }
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
