import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WerknemerModule } from './werknemer/werknemer.module';
import { BezoekerModule } from './bezoeker/bezoeker.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    WerknemerModule,

    BezoekerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
