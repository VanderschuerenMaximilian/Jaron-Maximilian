import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from './persons/persons.module';
import { SeedModule } from './seed/seed.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { AlertsModule } from './alerts/alerts.module';
import { ShopsModule } from './shops/shops.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { SoldProductsModule } from './sold-products/sold-products.module';
import { OrdersModule } from './orders/orders.module';
import { StocksModule } from './stocks/stocks.module';
import { TasksModule } from './tasks/tasks.module';
import { ZonesModule } from './zones/zones.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    TypeOrmModule.forRoot({
        type: 'mongodb',
        url: 'mongodb://localhost:27027/api',
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true, // Careful with this in production
        useNewUrlParser: true,
        useUnifiedTopology: true, // Disable deprecated warnings
    }),
    
    AlertsModule,
    AuthenticationModule,
    PersonsModule,
    SeedModule,
    AlertsModule,
    ShopsModule,
    CategoriesModule,
    ProductsModule,
    IngredientsModule,
    SoldProductsModule,
    OrdersModule,
    StocksModule,
    TasksModule,
    ZonesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
