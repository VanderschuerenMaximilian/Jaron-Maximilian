import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockInput } from './dto/create-stock.input';
import { UpdateStockInput } from './dto/update-stock.input';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'http';
import { log } from 'console';

@Injectable()
export class StocksService {
  beginTransaction() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  findAll() {
    return this.stockRepository.find()
  }

  create(createStockInput: CreateStockInput): Promise<Stock> {
    try {
      const s = new Stock()
      s.name = createStockInput.name
      s.facilityName = createStockInput.facilityName
      s.price = createStockInput.price
      s.stock = createStockInput.stock
      s.pending = createStockInput.pending
      s.stockReduction = createStockInput.stockReduction
      s.unit = createStockInput.unit
      s.minStock = createStockInput.minStock
      s.maxStock = createStockInput.maxStock
      return this.stockRepository.save(s)
    }
    catch (e) {
      throw new Error(e)
    }
  }

  async findByNameAndFacility(name: string, facilityName?: string): Promise<Stock | null> {
    const stocks = await this.findAll();
    if (!stocks || stocks.length === 0) {
      throw new NotFoundException(`No stocks found`);
    }
    const filteredStock = stocks.find(stock => stock.name === name && (!facilityName || stock.facilityName === facilityName));

    if (!filteredStock) throw new NotFoundException(`Stock with name (${name}) not found in facility (${facilityName})`);

    return filteredStock || null;
  }

  async updateStockByName(name: string, newStock: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne({ where: { name } });
    if (!stock) {
      throw new Error(`Stock with name ${name} not found`);
    }

    stock.stock = newStock;

    return await this.stockRepository.save(stock);
  }

  async updateStock(name: string, facilityName: string, newStock: number): Promise<Stock> {

    const stock = await this.stockRepository.findOne({ where: { name, facilityName } });
  
    if (!stock) {
      throw new NotFoundException(`Stock with name ${name} and facilityName ${facilityName} not found`);
    }
      stock.stock = newStock;
  
    return await this.stockRepository.save(stock);
  }

  async changeStock(name: string, facilityName: string, newStock: number): Promise<Stock> {
      const stock = await this.stockRepository.findOne({ where: { name, facilityName } });
    
      if (!stock) {
        throw new NotFoundException(`Stock with name ${name} and facilityName ${facilityName} not found`);
      }
        stock.stock = stock.stock + newStock;
    
      return await this.stockRepository.save(stock);
  }

  async changePending(name: string, facilityName: string, newStock: number): Promise<Stock> {
    const stock = await this.stockRepository.findOne({ where: { name, facilityName } });
  
    if (!stock) {
      throw new NotFoundException(`Stock with name ${name} and facilityName ${facilityName} not found`);
    }
    stock.pending = stock.pending + newStock;

    if (stock.pending < 0) {
      throw new Error(`Stock with name ${name} and facilityName ${facilityName} has less pending stock than requested`);
    }
  
    return await this.stockRepository.save(stock);
  }

  async updatePending(name: string, facilityName: string, newStock: number): Promise<Stock> {

    const stock = await this.stockRepository.findOne({ where: { name, facilityName } });
  
    if (!stock) {
      throw new NotFoundException(`Stock with name ${name} and facilityName ${facilityName} not found`);
    }
    
      stock.pending = stock.pending + newStock;
  
    return await this.stockRepository.save(stock);
  }

  async removePending(facilityName: string, stockItems: {name: string, quantity: number}[]): Promise<Stock[]> {
      
      const stocks = await this.findByFacilityName(facilityName);
      return await this.stockRepository.save(stocks);
    }
  
    async findByName(name: string): Promise<Stock | null> {
    const shop = await this.stockRepository.findOne({ where: { name } })

    if (!shop) {
      throw new NotFoundException(`Stock with name ${name} not found`)
    }

    return shop
  }

  async findByFacilityName(facilityName: string): Promise<Stock[] | null> {
    const stocks = await this.stockRepository.find({ where: { facilityName } });
  
    if (!stocks || stocks.length === 0) {
      throw new NotFoundException(`Stocks with facilityName ${facilityName} not found`);
    }
  
    return stocks;
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
