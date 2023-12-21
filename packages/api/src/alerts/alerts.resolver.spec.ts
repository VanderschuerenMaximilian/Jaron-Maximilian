import { Test, TestingModule } from '@nestjs/testing';
import { AlertsResolver } from './alerts.resolver';
import { AlertsService } from './alerts.service';
import { PersonsService } from 'src/persons/persons.service';
import { CreateAlertInput } from './dto/create-alert.input';
import { alertStub, createAlertInputStub } from './stubs/alerts.stub';
import { Alert } from './entities/alert.entity';
import { AlertState } from 'src/interfaces/IAlertState';

describe('AlertsResolver', () => {
  let resolver: AlertsResolver;
  let alertsService: AlertsService;
  let personsService: PersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertsResolver, {
        provide: AlertsService,
        useValue: {
          create: jest.fn().mockResolvedValue(alertStub()),
          findAll: jest.fn().mockResolvedValue([alertStub()]),
          findOne: jest.fn().mockResolvedValue(alertStub()),
          update: jest.fn().mockResolvedValue(alertStub()),
          remove: jest.fn().mockResolvedValue(alertStub()),
        }
      }, {
        provide: PersonsService,
        useValue: {
          findOne: jest.fn().mockResolvedValue({}),
        }
      }],
    }).compile();

    resolver = module.get<AlertsResolver>(AlertsResolver);
    alertsService = module.get<AlertsService>(AlertsService);
    personsService = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createAlert', () => {
    it('should create and return an alert', async () => {
      const testAlert: CreateAlertInput = createAlertInputStub();

      const createdAlert: Alert = {
        id: "6526a80bdc62ef69ffc7fde7",
        ...testAlert,
        state: AlertState.OPEN,
        persons: [],
        assignedPersonId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(alertsService, 'create').mockResolvedValueOnce(createdAlert);
      const result = await resolver.createAlert(testAlert);

      expect(result).toBe(createdAlert);
      expect(alertsService.create).toHaveBeenCalledWith(testAlert);
      expect(alertsService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the alert could not be created', async () => {
      const testAlert: CreateAlertInput = createAlertInputStub();

      jest.spyOn(alertsService, 'create').mockRejectedValueOnce(new Error('Error creating alert'));
      try {
        await resolver.createAlert(testAlert);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Error creating alert');
      }
    });
  });

  // describe('findAll', () => {
  //   it('should return an array of alerts', async () => {
  //     const alerts = [alertStub()];

  //     jest.spyOn(alertsService, 'findAll').mockResolvedValueOnce(alerts);
  //     const result = await resolver.findAll();

  //     expect(result).toBe(alerts);
  //     expect(alertsService.findAll).toHaveBeenCalledTimes(1);
  //   });

  //   it('should throw an error if the alerts could not be found', async () => {
  //     jest.spyOn(alertsService, 'findAll').mockRejectedValueOnce(new Error('Error finding alerts'));
  //     try {
  //       await resolver.findAll();
  //     } catch (error) {
  //       expect(error).toBeInstanceOf(Error);
  //       expect(error.message).toEqual('Error finding alerts');
  //     }
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return an alert', async () => {
  //     const alert = alertStub();

  //     jest.spyOn(alertsService, 'findOne').mockResolvedValueOnce(alert);
  //   });
  // });

});
