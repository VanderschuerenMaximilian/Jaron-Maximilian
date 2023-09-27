import { Test, TestingModule } from '@nestjs/testing';
import { WerknemerResolver } from './werknemer.resolver';
import { WerknemerService } from './werknemer.service';

describe('WerknemerResolver', () => {
  let resolver: WerknemerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WerknemerResolver, WerknemerService],
    }).compile();

    resolver = module.get<WerknemerResolver>(WerknemerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
