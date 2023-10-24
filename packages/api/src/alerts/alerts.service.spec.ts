import { Test, TestingModule } from '@nestjs/testing';
import { AlertsService } from './alerts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { Repository } from 'typeorm';
import { PersonsService } from 'src/persons/persons.service';

describe('AlertsService', () => {
  let service: AlertsService;
  let mockRepository: Repository<Alert>;
  let mockedPersonsService: PersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsService,
        {
          provide: getRepositoryToken(Alert),
          useValue: {
            save: jest.fn().mockResolvedValue({}),
          }
        },
        {
          provide: PersonsService,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<AlertsService>(AlertsService);
    mockRepository = module.get<Repository<Alert>>(getRepositoryToken(Alert));
    mockedPersonsService = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an alert once', async () => {
      const testAlert = new Alert();
      const saveSpy = jest.spyOn(mockRepository, 'save');
      await service.create(testAlert);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
  });
});
