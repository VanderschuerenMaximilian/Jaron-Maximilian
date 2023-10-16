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

@Module({
    imports: [PersonsModule, AlertsModule, ShopsModule, CategoriesModule, ProductsModule, IngredientsModule, SoldProductsModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
