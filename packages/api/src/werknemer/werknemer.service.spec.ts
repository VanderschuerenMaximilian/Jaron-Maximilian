import { Test, TestingModule } from '@nestjs/testing';
import { WerknemerService } from './werknemer.service';

describe('WerknemerService', () => {
  let service: WerknemerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WerknemerService],
    }).compile();

    service = module.get<WerknemerService>(WerknemerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
