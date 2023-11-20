import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { PersonsModule } from 'src/persons/persons.module';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { AlertsModule } from 'src/alerts/alerts.module';
import { ShopsModule } from 'src/shops/shops.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { SoldProductsModule } from 'src/sold-products/sold-products.module';
import { OrdersModule } from 'src/orders/orders.module';
import { StocksModule } from 'src/stocks/stocks.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { ZonesModule } from 'src/zones/zones.module';
import { TicketPricesModule } from 'src/ticket-prices/ticket-prices.module';

@Module({
    imports: [PersonsModule, AlertsModule, ZonesModule, TicketPricesModule, ShopsModule, CategoriesModule, ProductsModule, IngredientsModule, SoldProductsModule, OrdersModule, StocksModule, TasksModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
