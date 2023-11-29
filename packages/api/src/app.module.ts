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
import { TicketsModule } from './tickets/tickets.module';
import { TicketPricesModule } from './ticket-prices/ticket-prices.module';
import { CommandModule } from 'nestjs-command';
// import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      }
    }),

    TypeOrmModule.forRoot({
        type: 'mongodb',
        url: 'mongodb://localhost:27027/api',
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true, // Careful with this in production
        useNewUrlParser: true,
        useUnifiedTopology: true, // Disable deprecated warnings
    }),

    // MailerModule.forRoot({
    //   transport: {
    //     host: 'smtp.gmail.com',
    //     auth: {
    //       user: 'bearbanner00@gmail.com',
    //       pass: 'Bannerbear00',
    //     },
    //   }
    // }),
    
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
    TicketsModule,
    TicketPricesModule,
    // TODO: Where is this in their code?
    CommandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
