import { Injectable } from '@nestjs/common';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientInput } from './dto/update-ingredient.input';
import { Ingredient } from './entities/ingredient.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  findAll() {
    return this.ingredientRepository.find()
  }

  create(createIngredientInput: CreateIngredientInput): Promise<Ingredient> {
    const i = new Ingredient()
    i.name = createIngredientInput.name
    i.price = createIngredientInput.price
    i.stock = createIngredientInput.stock
    i.unit = createIngredientInput.unit
    i.minStock = createIngredientInput.minStock
    i.maxStock = createIngredientInput.maxStock
    return this.ingredientRepository.save(i)
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`
  }

  update(id: number, updateIngredientInput: UpdateIngredientInput) {
    return `This action updates a #${id} ingredient`
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`
  }

  // seeding logic

  saveAllIngredients(ingredients: Ingredient[]) {
    return this.ingredientRepository.save(ingredients)
  }

  truncate() {
    return this.ingredientRepository.clear()
  }
}
