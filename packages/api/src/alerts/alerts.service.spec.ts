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
import { Person } from 'src/persons/entities/person.entity';

describe('AlertsService', () => {
  let service: AlertsService;
  let mockRepository: Repository<Alert>;
  let mockedPersonsService: PersonsService;
  let mockedPersonRepository: Repository<Person>;

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
        PersonsService,
        {
          provide: getRepositoryToken(Person),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<AlertsService>(AlertsService);
    mockRepository = module.get<Repository<Alert>>(getRepositoryToken(Alert));
    mockedPersonsService = module.get<PersonsService>(PersonsService);
    mockedPersonRepository = module.get<Repository<Person>>(getRepositoryToken(Person));
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
      toTestAlert.zoneId = testAlert.zoneId;
      toTestAlert.persons = [];
      const saveSpy = jest.spyOn(mockRepository, 'save');
      await service.create(testAlert);
      expect(saveSpy).toBeCalledWith(toTestAlert);
    });

    it('should return the created alert', async () => {
      const testAlert = new Alert();
      const result = await service.create(testAlert);
      expect(result).toEqual(alertStub());
    });

    it('should throw an error if the alert could not be created', async () => {
      const testAlert = new Alert();
      jest.spyOn(mockRepository, 'save')
      try {
        const result = await service.create(testAlert);
        fail('should have thrown an error')
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
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

    it('should throw an error if the alerts could not be found', async () => {
      jest.spyOn(mockRepository, 'find')
      try {
        const result = await service.findAll();
        fail('should have thrown an error')
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    })
  });

  describe('findOneById', () => {
    it('should call the alertRepository.findOne once', async () => {
      const findOneSpy = jest.spyOn(mockRepository, 'findOne');
      await service.findOneById('6526a80bdc62ef69ffc7fde7');
      expect(findOneSpy).toBeCalledTimes(1)
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

    it('should return an error if the id is invalid', async () => {
      try {
        const r = await service.findOneById('14vj6');
        fail('should have thrown an error')
      } catch (error) {
        expect(error.message).toEqual('Invalid ObjectId');
      }
    });
  })

  //TODO: complete update testing
  describe('update', () => {
    it('should update an alert once', async () => {
      const testAlert: Alert = alertStub();
      const testUpdatedAlert = updateAlertInputStub();
      const toTestUpdatedAlert = new Alert();
      toTestUpdatedAlert.id = testUpdatedAlert.id;
      toTestUpdatedAlert.title = testAlert.title;
      toTestUpdatedAlert.description = testAlert.description;
      toTestUpdatedAlert.state = AlertState.RESOLVED;
      toTestUpdatedAlert.assignedPersonId = testAlert.assignedPersonId;
      toTestUpdatedAlert.zoneId = testAlert.zoneId;
      toTestUpdatedAlert.persons = testAlert.persons;
      toTestUpdatedAlert.createdBy = testAlert.createdBy;

      console.log(toTestUpdatedAlert)

      const updateSpy = jest.spyOn(mockRepository, 'save');
      const findOneSpy = jest.spyOn(mockRepository, 'findOne');
      const updatePersonSpy = jest.spyOn(mockedPersonRepository, 'save');
      const result = await service.update(testUpdatedAlert);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(updatePersonSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(toTestUpdatedAlert);
    });

  });
});