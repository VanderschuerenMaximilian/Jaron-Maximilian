import { Body, Delete, Get, Injectable, Param, Post } from '@nestjs/common';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { AlertState } from 'src/interfaces/IAlertState';
import { PersonsService } from 'src/persons/persons.service';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: MongoRepository<Alert>,
    private readonly personService: PersonsService,
  ) {}

  @Post()
  create(@Body() createAlertInput: CreateAlertInput): Promise<Alert> {
    try {
      const a = new Alert()
      a.title = createAlertInput.title
      a.description = createAlertInput.description
      a.state = AlertState.OPEN
      a.createdBy = createAlertInput.createdBy
      a.zoneId = createAlertInput.zoneId
      a.persons = []
      a.createdAt = new Date()
      a.updatedAt = new Date()
      return this.alertRepository.save(a)
    } catch (error) {
      throw new Error(error)
    }
  }

  @Post()
  async update(@Body() updateAlertInput: UpdateAlertInput) {
    try {
      const toUpdateAlert = await this.findOneById(updateAlertInput.id)
      if (!toUpdateAlert) throw new Error('Alert not found')
      const a = new Alert();
      a.id = toUpdateAlert.id
      a.title = toUpdateAlert.title
      a.description = toUpdateAlert.description
      a.state = updateAlertInput.state as AlertState
      a.assignedPersonId = updateAlertInput.assignedPersonId? updateAlertInput.assignedPersonId : toUpdateAlert.assignedPersonId
      a.persons = null
      a.createdBy = toUpdateAlert.createdBy
      a.updatedAt = new Date()

      if (updateAlertInput.state === AlertState.RESOLVED) await this.personService.removeAssignedAlert(a.assignedPersonId, a.id)

      return this.alertRepository.save(a)
    } catch (error) {
      throw new Error(error)
    }
  }

  @Post()
  async addPersonToAlert(@Param() alertId: string, @Param() personId: string): Promise<Alert> {
    try {
      const alert = await this.findOneById(alertId)

      if (!alert) throw new Error('Alert not found')
      
      const personExists = await this.personService.findOneById(personId)

      if (!personExists) throw new Error('Person not found')
      
      if (!alert.assignedPersonId) {
        alert.persons.push(personExists)
        this.personService.assignAlertId(personId, alertId)
      }
      else throw new Error('Alert already has an assigned person')
      
      return this.alertRepository.save(alert)
    } catch (error) {
      throw new Error(error)
    }
  }

  @Post()
  async removePersonFromAlert(@Param() alertId: string, @Param() personId: string): Promise<Alert> {
    try {
      const alert = await this.findOneById(alertId)

      if (!alert) throw new Error('Alert not found')
      
      const personExists = await this.personService.findOneById(personId)

      if (!personExists) throw new Error('Person not found')
      
      if (alert.persons) {
        for (const person of alert.persons) {
          if (person.id.toString() === personId) {
            const slicing = alert.persons.splice(alert.persons.indexOf(person), 1)
            this.personService.removeAssignedAlert(personId, alertId)
          }
        }
      }
      else throw new Error('Alert has no assigned employees')
      
      return this.alertRepository.save(alert)
    } catch (error) {
      throw new Error(error)
    }
  }

  @Get()
  findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  @Get(':employeeId')
  async findNonResolvedAlertsByEmployee(@Param('employeeId') employeeId: string): Promise<Alert[]> {
    try {

      const employee = await this.personService.findOneById(employeeId)
      
      if (!employee) throw new Error('Employee not found')

      const nonResolvedAlerts = await Promise.all(employee.assignedAlerts.map(async (alertId) => {
        const alert = await this.findOneById(alertId)
        if (alert.state !== AlertState.RESOLVED) {
          return alert
        }
      }))
    
      return nonResolvedAlerts
    } catch (error) {
      throw new Error(error)
    }
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<Alert> {

      if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')

      // @ts-ignore
      return this.alertRepository.findOne({ _id: new ObjectId(id) })
  }

  @Get()
  findNonAssignedAlerts(): Promise<Alert[]> {
    return this.alertRepository.find({ assignedPersonId: null, state: AlertState.OPEN })
  }

  @Get()
  async findNonResolvedAlertsByCreatedBy(@Param('createdBy') createdBy: string): Promise<Alert[]> {
    const openAlerts = await this.alertRepository.find({ createdBy: createdBy, state: AlertState.OPEN })
    const acknowlegdeAlerts = await this.alertRepository.find({ createdBy: createdBy, state: AlertState.ACKNOWLEDGED })
    let alerts = []
    for (const alert of openAlerts) {
      alerts.push(alert)
    }
    for (const alert of acknowlegdeAlerts) {
      alerts.push(alert)
    }

    return alerts
  }

  @Delete(':id')
  async remove(id: string) {
    try {
      const alert = await this.alertRepository.delete(id);
      
      return alert
    } catch (error) {
      throw error
    }
  }

  //seeding alerts

  saveAllAlerts(alerts: Alert[]) {
    return this.alertRepository.save(alerts)
  }

  truncate() {
    return this.alertRepository.clear()
  }
}
