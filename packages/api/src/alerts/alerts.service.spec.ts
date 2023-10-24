import { Test, TestingModule } from '@nestjs/testing';
import { AlertsService } from './alerts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { Repository } from 'typeorm';
import { PersonsService } from 'src/persons/persons.service';
import { alertStub, createAlertInputStub, updateAlertInputStub } from './stubs/alerts.stub';
import { CreateAlertInput } from './dto/create-alert.input';
import { AlertState } from 'src/interfaces/IAlertState';
import { ObjectId } from 'mongodb';
import exp from 'constants';
import { UpdateAlertInput } from './dto/update-alert.input';

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
            save: jest.fn().mockResolvedValue(alertStub()),
            update: jest.fn().mockResolvedValue(alertStub()),
            find: jest.fn().mockResolvedValue([alertStub()]),
            findOne: jest.fn().mockResolvedValue(alertStub()),
            
          }
        },
        {
          provide: PersonsService,
          useValue: {
            save: jest.fn().mockResolvedValue(alertStub()),
          }
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

    it('should call the repository with the correct arguments', async () => {
      const testAlert: CreateAlertInput = createAlertInputStub();
      const toTestAlert = new Alert();
      toTestAlert.title = testAlert.title;
      toTestAlert.description = testAlert.description;
      toTestAlert.createdBy = testAlert.createdBy;
      toTestAlert.state = AlertState.OPEN;
      toTestAlert.createdAt = new Date();
      toTestAlert.updatedAt = new Date();
      const saveSpy = jest.spyOn(mockRepository, 'save');
      await service.create(testAlert);
      expect(saveSpy).toBeCalledWith(toTestAlert);
    });

    it('should return the created alert', async () => {
      const testAlert = new Alert();
      const result = await service.create(testAlert);
      expect(result).toEqual(alertStub());
    });
  });

  describe('findAll', () => {
    it('should call the alertRepository.find once', async () => {
      const findSpy = jest.spyOn(mockRepository, 'find');
      await service.findAll();
      expect(findSpy).toBeCalledTimes(1);
    });

    it('should return an array of alerts', async () => {
      const result = await service.findAll();
      expect(result).toEqual([alertStub()]);
    });
  });

  describe('findOneById', () => {
    it('should call the alertRepository.findOne once', async () => {
      const findOneSpy = jest.spyOn(mockRepository, 'findOne');
      await service.findOneById('6526a80bdc62ef69ffc7fde7');
      expect(findOneSpy).toBeCalledTimes(1);
    });

    it('should call the alertRepository.findOne with the correct arguments', async () => {
      const findOneSpy = jest.spyOn(mockRepository, 'findOne');
      await service.findOneById('6526a80bdc62ef69ffc7fde7');
      expect(findOneSpy).toBeCalledWith({ _id: new ObjectId('6526a80bdc62ef69ffc7fde7') });
    });

    it('should return the alert', async () => {
      const myAlert = alertStub();
      const result = await service.findOneById('6526a80bdc62ef69ffc7fde7');
      expect(result).toEqual(myAlert);
    });

    it('should return the found alert', async () => {
      try {
        const r = await service.findOneById('14vj6');
      } catch (error) {
        expect(error.message).toEqual('Invalid ObjectId');
      }
    });
  })

  //TODO: complete update testing
  // describe('update', () => {
  //   it('should update an alert once', async () => {
  //     const testAlert: UpdateAlertInput = updateAlertInputStub();
  //     const updateSpy = jest.spyOn(mockRepository, 'update');
  //     const findOneSpy = jest.spyOn(mockRepository, 'findOne');
  //     await service.update(testAlert);
  //     expect(updateSpy).toHaveBeenCalledTimes(1);
  //     expect(findOneSpy).toHaveBeenCalledTimes(1);
  //   });

  // });

  // TODO: complete addPersonToAlert testing
  describe('addPersonToAlert', () => {
    it('should call alertRepository.addPersonToAlert once', async () => {
      const findOneSpy = jest.spyOn(mockRepository, 'findOne');
      const saveSpy = jest.spyOn(mockRepository, 'save');
      await service.addPersonToAlert('6526a80bdc62ef69ffc7fde7', '6523c13a5abc7f17748bd6b9');
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    })

    // it('should call alertRepository.findOneById with the correct arguments', async () => {
    //   const findOneSpy = jest.spyOn(mockRepository, 'findOne');
    //   await service.addPersonToAlert('6526a80bdc62ef69ffc7fde7', '6526a80bdc62ef69ffc7fde7');
    //   expect(findOneSpy).toBeCalledWith({ _id: new ObjectId('6526a80bdc62ef69ffc7fde7') });
    // })
  });
});
