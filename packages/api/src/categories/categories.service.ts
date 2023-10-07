import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find()
  }
  create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const c = new Category()
    c.name = createCategoryInput.name
    c.image = createCategoryInput.image

    return this.categoryRepository.save(c)
  }

  findOne(id: number) {
    return `This action returns a #${id} category`
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`
  }

  remove(id: number) {
    return `This action removes a #${id} category`
  }

  // seeding logic

  saveAllCategories(categories: Category[]) {
    return this.categoryRepository.save(categories)
  }

  truncate() {
    return this.categoryRepository.clear()
  }
}
