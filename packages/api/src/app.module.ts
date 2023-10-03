import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WerknemerModule } from './werknemer/werknemer.module';
import { BezoekerModule } from './bezoeker/bezoeker.module';
import { SeedModule } from './seed/seed.module';
import { AdministratorsModule } from './administrators/administrators.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { VisitorsModule } from './visitors/visitors.module';
import { PersonsModule } from './persons/persons.module';

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
    
    WerknemerModule,

    BezoekerModule,

    SeedModule,

    AdministratorsModule,

    AuthenticationModule,

    VisitorsModule,

    PersonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
