import { Test, TestingModule } from '@nestjs/testing';
import { AlertsResolver } from './alerts.resolver';
import { AlertsService } from './alerts.service';
import { PersonsService } from 'src/persons/persons.service';
import { CreateAlertInput } from './dto/create-alert.input';
import { alertStub, createAlertInputStub, updateAlertInputStub } from './stubs/alerts.stub';
import { Alert } from './entities/alert.entity';
import { AlertState } from 'src/interfaces/IAlertState';
import { UpdateAlertInput } from './dto/update-alert.input';
import { DeleteResult } from 'typeorm';

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

  describe('findAll', () => {
    it('should return an array of alerts', async () => {
      const alerts = [alertStub()];

      jest.spyOn(alertsService, 'findAll').mockResolvedValueOnce(alerts);
      const result = await resolver.findAll();

      expect(result).toBe(alerts);
      expect(alertsService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the alerts could not be found', async () => {
      jest.spyOn(alertsService, 'findAll').mockRejectedValueOnce(new Error('Error finding alerts'));
      try {
        await resolver.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Error finding alerts');
      }
    });
  });

  describe('findOne', () => {
    it('should return an alert', async () => {
      const alert = alertStub();

      jest.spyOn(resolver, 'findOne').mockResolvedValueOnce(alert);
      const result = await resolver.findOne(alert.id);

      expect(result).toBe(alert);
      expect(resolver.findOne).toHaveBeenCalledTimes(1);
      expect(resolver.findOne).toHaveBeenCalledWith(alert.id);
    });

    it('should throw an error if the alert could not be found', async () => {
      jest.spyOn(resolver, 'findOne').mockRejectedValueOnce(new Error('Error finding alert'));
      try {
        await resolver.findOne(alertStub().id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Error finding alert');
      }
    });
  });

  describe('findNonResolvedAlertsByEmployee', () => {
    it('should return an array of alerts', async () => {
      const alerts = [alertStub(), alertStub()];

      jest.spyOn(resolver, 'findNonResolvedAlertsByEmployee').mockResolvedValueOnce(alerts);
      const result = await resolver.findNonResolvedAlertsByEmployee('6523c13a5abc7f17748bd6b9');

      expect(result).toBe(alerts);
      expect(resolver.findNonResolvedAlertsByEmployee).toHaveBeenCalledTimes(1);
      expect(resolver.findNonResolvedAlertsByEmployee).toHaveBeenCalledWith('6523c13a5abc7f17748bd6b9');
    });

    it('should throw an error if the alerts could not be found', async () => {
      jest.spyOn(resolver, 'findNonResolvedAlertsByEmployee').mockRejectedValueOnce(new Error('Error finding alerts'));
      try {
        await resolver.findNonResolvedAlertsByEmployee(alertStub().createdBy);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Error finding alerts');
      }
    });
  });

  describe('findNonAssignedAlerts', () => {
    it('should return an array of alerts', async () => {
      const alerts = [alertStub(), alertStub()];

      jest.spyOn(resolver, 'findNonAssignedAlerts').mockResolvedValueOnce(alerts);
      const result = await resolver.findNonAssignedAlerts();

      expect(result).toBe(alerts);
      expect(resolver.findNonAssignedAlerts).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the alerts could not be found', async () => {
      jest.spyOn(resolver, 'findNonAssignedAlerts').mockRejectedValueOnce(new Error('Error finding alerts'));
      try {
        await resolver.findNonAssignedAlerts();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Error finding alerts');
      }
    });
  });

  describe('findNonResolvedAlertsByCreatedBy', () => {
    it('should return an array of alerts', async () => {
      const alerts = [alertStub(), alertStub()];

      jest.spyOn(resolver, 'findNonResolvedAlertsByCreatedBy').mockResolvedValueOnce(alerts);
      const result = await resolver.findNonResolvedAlertsByCreatedBy('6523c13a5abc7f17748bd6b9');

      expect(result).toBe(alerts);
      expect(resolver.findNonResolvedAlertsByCreatedBy).toHaveBeenCalledTimes(1);
      expect(resolver.findNonResolvedAlertsByCreatedBy).toHaveBeenCalledWith('6523c13a5abc7f17748bd6b9');
    });

    it('should throw an error if the alerts could not be found', async () => {
      jest.spyOn(resolver, 'findNonResolvedAlertsByCreatedBy').mockRejectedValueOnce(new Error('Error finding alerts'));
      try {
        await resolver.findNonResolvedAlertsByCreatedBy(alertStub().createdBy);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Error finding alerts');
      }
    });
  });

  describe('removeAlert', () => {
    it('should return an alert', async () => {
      const alert = alertStub();

      jest.spyOn(resolver, 'removeAlert')
      const result = await resolver.removeAlert(alert.id);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Alert);
      expect(resolver.removeAlert).toHaveBeenCalledTimes(1);
      expect(alertsService.remove).toHaveBeenCalledTimes(1);
      expect(alertsService.remove).toHaveBeenCalledWith(alert.id);
    });

    it('should throw an error if the alert could not be removed', async () => {
      jest.spyOn(alertsService, 'remove').mockRejectedValueOnce(new Error('Error removing alert'));
      try {
        await resolver.removeAlert(alertStub().id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual('Error removing alert');
      }
    });
  });

});
