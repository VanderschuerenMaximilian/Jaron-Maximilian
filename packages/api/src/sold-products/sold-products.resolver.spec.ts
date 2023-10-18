import { Test, TestingModule } from '@nestjs/testing';
import { SoldProductsResolver } from './sold-products.resolver';
import { SoldProductsService } from './sold-products.service';

describe('SoldProductsResolver', () => {
  let resolver: SoldProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoldProductsResolver, SoldProductsService],
    }).compile();

    resolver = module.get<SoldProductsResolver>(SoldProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
