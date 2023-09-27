import { Test, TestingModule } from '@nestjs/testing';
import { BezoekerService } from './bezoeker.service';

describe('BezoekerService', () => {
  let service: BezoekerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BezoekerService],
    }).compile();

    service = module.get<BezoekerService>(BezoekerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
