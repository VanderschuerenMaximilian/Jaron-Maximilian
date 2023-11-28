import { Resolver, Query, Mutation, Args, Int, Field, InputType } from '@nestjs/graphql';
import { StocksService } from './stocks.service';
import { Stock } from './entities/stock.entity';
import { CreateStockInput } from './dto/create-stock.input';
import { UpdateStockInput } from './dto/update-stock.input';
import { Logger } from '@nestjs/common';

@InputType()
class StockInput {
  @Field()
  name: string;

  @Field(() => Int)
  difference: number;
}

@Resolver(() => Stock)
export class StocksResolver {
  constructor(private readonly stocksService: StocksService) {}

  @Mutation(() => Stock)
  createStock(@Args('createStockInput') createStockInput: CreateStockInput) {
    return this.stocksService.create(createStockInput);
  }

  @Query(() => [Stock], { name: 'stocks' })
  findAll() {
    return this.stocksService.findAll();
  }

  @Query(() => Stock, { name: 'stockByName' })
  async getStockByName(
    @Args('name') name: string,
    @Args('facilityName', { nullable: true }) facilityName?: string,
  ): Promise<Stock | null> {
    return this.stocksService.findByNameAndFacility(name, facilityName);
  }


  @Query(() => [String], { name: 'uniqueFacilityNames' })
  async getUniqueFacilityNames(): Promise<string[]> {
    const stocks = await this.stocksService.findAll();
    const uniqueFacilityNames = Array.from(new Set(stocks.map(stock => stock.facilityName)));
    return uniqueFacilityNames;
  }

  @Query(() => [Stock], { name: 'stocksByFacilityName' })
  async getStocksByFacilityName(
    @Args('facilityName') facilityName: string,
  ): Promise<Stock[] | null> {
    return this.stocksService.findByFacilityName(facilityName);
  }

  @Query(() => Stock, { name: 'stock' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stocksService.findOne(id);
  }

  @Mutation(() => Stock)
    updateStock(
      @Args('name') name: string,
      @Args('facilityName') facilityName: string,
      @Args('newStock', { type: () => Int }) newStock: number,
    ) {
      return this.stocksService.updateStock(name, facilityName, newStock);
    }

    @Mutation(() => [Stock])
      async updateStockWithPending(
        @Args('facilityName') facilityName: string,
        @Args('ingredients', { type: () => [StockInput] }) ingredients: StockInput[],
      ): Promise<Stock[]> {
        const stocks = await this.stocksService.findAll();
        const uniqueFacilityNames = Array.from(new Set(stocks.map(stock => stock.facilityName)));

        if (!uniqueFacilityNames.includes(facilityName)) {
          throw new Error(`Facility with name ${facilityName} not found`);
        }
        else {
          // ❗❗❗ Hier zitten nog fouten in mer de frontend ❗❗❗
          // PAS OP ALS ER AL EEN PENDING IN ZIT DAN MOET HIJ DE NIEUWE PENDING ERBIJ OPTELLEN EN NIET AANPASSEN
          if (facilityName === "Main Stock") {
            const correctIngredients: Record<string, number> = {};
            let allIngredientsValid = true;
            for (const ingredient of ingredients) {
              const stock = await this.stocksService.findByNameAndFacility(ingredient.name, facilityName);
              if (!stock) {
                allIngredientsValid = false;
                throw new Error(`${stock.name} not found`);
              }
              if (stock.maxStock - (stock.stock + ingredient.difference) < 0) {
                allIngredientsValid = false;

                throw new Error(`The quantity of the stock you're attempting to add exceeds the maximum allowable amount for ${stock.name} stock.`);
              }
              if (!stock.name) {
                allIngredientsValid = false;
                throw new Error(`Name is null or undefined for stock with ID ${stock.id}`);
              }
              correctIngredients[ingredient.name] = stock.stock + ingredient.difference;
            }
            if (allIngredientsValid) {
              for (const ingredient in correctIngredients) {
                this.stocksService.updateStock(ingredient, facilityName, correctIngredients[ingredient]);
              }    
              const updatedStocks = await this.getStocksByFacilityName(facilityName);
              return updatedStocks;
              // const updatedStocks = await this.getStocksByFacilityName(facilityName);
            }
            else {
              throw new Error(`Stocks not updated`);
            }
          }
          else {
            const correctIngredients: Record<string, number> = {};
            const correctIngredients2: Record<string, number> = {};
            let allIngredientsValid = true;
            for (const ingredient of ingredients) {
              const stock = await this.stocksService.findByNameAndFacility(ingredient.name, facilityName);
              if (!stock) {
                allIngredientsValid = false;
                throw new Error(`${stock.name} not found`);
              }
              if (stock.maxStock - (stock.stock + stock.pending + ingredient.difference) < 0) {
                allIngredientsValid = false;
                throw new Error(`The quantity of the stock you're attempting to add exceeds the maximum allowable amount for ${stock.name} stock.`);
              }
              if (!stock.name) {
                allIngredientsValid = false;
                throw new Error(`Name is null or undefined for stock with ID ${stock.id}`);
              }
              correctIngredients[ingredient.name] = ingredient.difference;
            }
            for (const ingredient of ingredients) {
              const stock = await this.stocksService.findByNameAndFacility(ingredient.name, "Main Stock");
              if (!stock) {
                allIngredientsValid = false;
                throw new Error(`${stock.name} not found`);
              }
              if (stock.stock - stock.pending - ingredient.difference < 0) {
                allIngredientsValid = false;
                throw new Error(`The quantity of the stock you're attempting to reduce exceeds the minimum allowable amount for ${stock.name} stock.`);
              }
              if (!stock.name) {
                allIngredientsValid = false;
                throw new Error(`Name is null or undefined for stock with ID ${stock.id}`);
              }
              correctIngredients2[ingredient.name] = ingredient.difference;
            }
            if (allIngredientsValid) {
              for (const ingredient in correctIngredients) {
                await this.stocksService.updatePending(ingredient, facilityName, correctIngredients[ingredient]);
                await this.stocksService.updatePending(ingredient, "Main Stock", correctIngredients2[ingredient]);
              }     
              // const updatedStocks = await this.getStocksByFacilityName(facilityName);
              const updatedStocks = await this.getStocksByFacilityName(facilityName);
              return updatedStocks;
              
            }
            else {
              throw new Error(`Stocks not updated`);
            }
          }
        }
    }

  @Mutation(() => Stock)
  removeStock(@Args('id', { type: () => Int }) id: number) {
    return this.stocksService.remove(id);
  }
}
