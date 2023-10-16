import { Test, TestingModule } from '@nestjs/testing';
import { SoldProductsService } from './sold-products.service';

describe('SoldProductsService', () => {
  let service: SoldProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldProductsService],
    }).compile();

    service = module.get<SoldProductsService>(SoldProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
