import { Test, TestingModule } from '@nestjs/testing';
import { AdministratorsResolver } from './administrators.resolver';
import { AdministratorsService } from './administrators.service';

describe('AdministratorsResolver', () => {
  let resolver: AdministratorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministratorsResolver, AdministratorsService],
    }).compile();

    resolver = module.get<AdministratorsResolver>(AdministratorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
