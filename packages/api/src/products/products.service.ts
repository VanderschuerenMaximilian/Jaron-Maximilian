import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find()
  }

  create(createProductInput: CreateProductInput): Promise<Product> {
    const p = new Product()
    p.name = createProductInput.name
    p.description = createProductInput.description
    p.image = createProductInput.image
    p.price = createProductInput.price
    p.category = createProductInput.category
    p.size = createProductInput.size
    p.sauce = createProductInput.sauce
    p.extra = createProductInput.extra
    p.removable = createProductInput.removable
    p.ingredients = createProductInput.ingredients
    p.shopType = createProductInput.shopType

    return this.productRepository.save(p)
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }

  // seeding logic

  saveAllProducts(shops: Product[]) {
    return this.productRepository.save(shops)
  }

  truncate() {
    return this.productRepository.clear()
  }
}
