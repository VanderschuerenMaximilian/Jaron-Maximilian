import { Test, TestingModule } from '@nestjs/testing';
import { TicketPricesResolver } from './ticket-prices.resolver';
import { TicketPricesService } from './ticket-prices.service';

describe('TicketPricesResolver', () => {
  let resolver: TicketPricesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketPricesResolver, TicketPricesService],
    }).compile();

    resolver = module.get<TicketPricesResolver>(TicketPricesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
