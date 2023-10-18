import { Injectable } from '@nestjs/common';
import { CreateSoldProductInput } from './dto/create-sold-product.input';
import { UpdateSoldProductInput } from './dto/update-sold-product.input';
import { Repository } from 'typeorm';
import { SoldProduct } from './entities/sold-product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SoldProductsService {
  constructor(
    @InjectRepository(SoldProduct)
    private readonly soldProductRepository: Repository<SoldProduct>,
  ) {}

  findAll() {
    return this.soldProductRepository.find()
  }

  create(createSoldProductInput: CreateSoldProductInput):Promise<SoldProduct> {
    const s = new SoldProduct()
    s.productId = createSoldProductInput.productId
    s.amount = createSoldProductInput.amount
    s.size = createSoldProductInput.size
    s.sauce = createSoldProductInput.sauce
    s.removeables = createSoldProductInput.removeables
    s.extras = createSoldProductInput.extras
    return this.soldProductRepository.save(s)

    }

  findOne(id: number) {
    return `This action returns a #${id} soldProduct`;
  }

  update(id: number, updateSoldProductInput: UpdateSoldProductInput) {
    return `This action updates a #${id} soldProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} soldProduct`;
  }

  // seeding logic

  saveAllSoldProducts(soldPorducts: SoldProduct[]) {
    return this.soldProductRepository.save(soldPorducts)
  }

  truncate() {
    return this.soldProductRepository.clear()
  }
}
