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
        for (const product of createOrderInput.soldProducts) {
          // TODO: Nu kan het zijn dat als je een order doet dat er een product af in de stock maar dat er geen order gamaakt word en 
          // dat komt door dat de hij ingredient per ingredient overloopt denkik en dus een ingredient update maar dan bij het volgende pas de error geeft
          try {
                const p = await this.productsService.findByName(product.productName);
    
                for (const ingredient of p.ingredients) {
                    const stockItem = await this.stocksService.findByName(ingredient);
                    if (product.size == "Small") {
                      if (stockItem.stock >= ((stockItem.stockReduction - 50) * product.amount)) {
                        stockItem.stock = stockItem.stock - ((stockItem.stockReduction - 50) * product.amount);
                        await this.stocksService.updateStockByName(stockItem.name, stockItem.stock)
                      } else throw new Error(`Onvoldoende voorraad voor ingrediënt: ${ingredient}`);
                      }
                      if (product.size == "Large") {
                        if (stockItem.stock >= ((stockItem.stockReduction + 50) * product.amount)) {
                          stockItem.stock = stockItem.stock - ((stockItem.stockReduction + 50) * product.amount);
                          await this.stocksService.updateStockByName(stockItem.name, stockItem.stock)
                        } else throw new Error(`Onvoldoende voorraad voor ingrediënt: ${ingredient}`);
                      }
                      if (product.size == "Medium") {
                        if (stockItem.stock >= ((stockItem.stockReduction) * product.amount)) {
                          stockItem.stock = stockItem.stock - (stockItem.stockReduction * product.amount);
                          await this.stocksService.updateStockByName(stockItem.name, stockItem.stock);
                      } else throw new Error(`Onvoldoende voorraad voor ingrediënt: ${ingredient}`);
                      }
                    }
                if (product.extras.length >= 1) {
                  for (const extra of product.extras) {
                      const stockItem = await this.stocksService.findByName(extra);
                      if (stockItem.stock >= (stockItem.stockReduction * product.amount)) {
                          stockItem.stock = stockItem.stock - (stockItem.stockReduction * product.amount);
                          await this.stocksService.updateStockByName(stockItem.name, stockItem.stock);
                      } else {
                          throw new Error(`Onvoldoende voorraad voor extra: ${extra}`);
                      }
                  }
                }
                if (product.removeables.length >= 1) {
                  for (const removeable of product.removeables) {
                      const stockItem = await this.stocksService.findByName(removeable);
                      if (stockItem.stock >= 1) {
                          stockItem.stock = stockItem.stock + (stockItem.stockReduction * product.amount);
                          await this.stocksService.updateStockByName(stockItem.name, stockItem.stock);
                      } else {
                          throw new Error(`Onvoldoende voorraad voor verwijderbaar item: ${removeable}`);
                      }
                  }
                }
                if (product.sauce != 'No Sauce') {
                  const sauce = product.sauce
                  const stockItem = await this.stocksService.findByName(sauce);
                  if (stockItem.stock >= (stockItem.stockReduction * product.amount)) {
                      stockItem.stock = stockItem.stock - (stockItem.stockReduction * product.amount);
                      await this.stocksService.updateStockByName(stockItem.name, stockItem.stock);
                  } else {
                      throw new Error(`Onvoldoende voorraad voor extra: ${sauce}`);
                  }
                }                
            } catch (error) {
                console.error(`Fout bij verwerken product ${product.productName}: ${error.message}`);
                throw new Error(`Fout bij verwerken product ${product.productName}`);
            }
        }

        const order = await this.ordersService.create(createOrderInput);

    
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
