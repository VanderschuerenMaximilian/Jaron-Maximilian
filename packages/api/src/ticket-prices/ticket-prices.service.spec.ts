import { Test, TestingModule } from '@nestjs/testing';
import { TicketPricesService } from './ticket-prices.service';

describe('TicketPricesService', () => {
  let service: TicketPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketPricesService],
    }).compile();

    service = module.get<TicketPricesService>(TicketPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
