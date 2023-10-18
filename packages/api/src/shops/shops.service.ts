import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { ObjectId, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Shop } from './entities/shop.entity'

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  findAll() {
    return this.shopRepository.find()
  }

  create(createShopInput: CreateShopInput): Promise<Shop> {
    try {
      const s = new Shop()
      s.category = createShopInput.category
      s.description = createShopInput.description
      s.products = createShopInput.products
      s.image = createShopInput.image
      s.name = createShopInput.name
      s.shopType = createShopInput.shopType
      s.zone = createShopInput.zone

      return this.shopRepository.save(s)
    } catch (error) {
      throw error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`
  }

  async findByName(name: string): Promise<Shop | null> {
    const shop = await this.shopRepository.findOne({ where: { name } })

    if (!shop) {
      throw new NotFoundException(`Shop with name ${name} not found`)
    }

    return shop
  }

  update(id: number, updateShopInput: UpdateShopInput) {
    return `This action updates a #${id} shop`
  }

  remove(id: number) {
    return `This action removes a #${id} shop`
  }

  // seeding logic

  saveAllShops(shops: Shop[]) {
    return this.shopRepository.save(shops)
  }

  truncate() {
    return this.shopRepository.clear()
  }
}
