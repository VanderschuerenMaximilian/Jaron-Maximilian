import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsResolver } from './ingredients.resolver';
import { Ingredient } from './entities/ingredient.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PersonsModule } from 'src/persons/persons.module';


@Module({
  imports: [TypeOrmModule.forFeature([Ingredient]), PersonsModule],
  providers: [IngredientsResolver, IngredientsService],
  exports: [IngredientsService],
})
export class IngredientsModule {}
