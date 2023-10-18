import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockInput } from './dto/create-stock.input';
import { UpdateStockInput } from './dto/update-stock.input';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  findAll() {
    return this.stockRepository.find()
  }

  create(createStockInput: CreateStockInput): Promise<Stock> {
    const s = new Stock()
    s.name = createStockInput.name
    s.facilityId = createStockInput.facilityId
    s.price = createStockInput.price
    s.stock = createStockInput.stock
    s.stockReduction = createStockInput.stockReduction
    s.unit = createStockInput.unit
    s.minStock = createStockInput.minStock
    s.maxStock = createStockInput.maxStock
    return this.stockRepository.save(s)
  }

  async updateStockByName(name: string, newStock: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne({ where: { name } });
    if (!stock) {
      throw new Error(`Stock with name ${name} not found`);
    }

    stock.stock = newStock;

    return await this.stockRepository.save(stock);
  }

  async findByName(name: string): Promise<Stock | null> {
    const shop = await this.stockRepository.findOne({ where: { name } })

    if (!shop) {
      throw new NotFoundException(`Stock with name ${name} not found`)
    }

    return shop
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockInput: UpdateStockInput) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }

  // seeding logic

  saveAllStocks(stocks: Stock[]) {
    return this.stockRepository.save(stocks)
  }

  truncate() {
    return this.stockRepository.clear()
  }
}
