import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const i = new Ingredient()
      i.name = createIngredientInput.name
      i.price = createIngredientInput.price
      i.stock = createIngredientInput.stock
      i.unit = createIngredientInput.unit
      i.minStock = createIngredientInput.minStock
      i.maxStock = createIngredientInput.maxStock
      return this.ingredientRepository.save(i)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  async updateStockByName(name: string, newStock: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne({ where: { name } });
    if (!ingredient) {
      throw new Error(`Ingredient with name ${name} not found`);
    }

    ingredient.stock = newStock;

    return await this.ingredientRepository.save(ingredient);
  }


  async findByName(name: string): Promise<Ingredient | null> {
    const shop = await this.ingredientRepository.findOne({ where: { name } })

    if (!shop) {
      throw new NotFoundException(`Category with name ${name} not found`)
    }

    return shop
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
