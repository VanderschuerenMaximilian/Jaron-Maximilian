import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), PersonsModule],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService ],
})
export class CategoriesModule {}
