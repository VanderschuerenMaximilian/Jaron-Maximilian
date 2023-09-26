import { Test, TestingModule } from '@nestjs/testing';
import { BezoekerResolver } from './bezoeker.resolver';
import { BezoekerService } from './bezoeker.service';

describe('BezoekerResolver', () => {
  let resolver: BezoekerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BezoekerResolver, BezoekerService],
    }).compile();

    resolver = module.get<BezoekerResolver>(BezoekerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
