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
      a.createdAt = new Date()
      a.updatedAt = new Date()
      return this.alertRepository.save(a)
    } catch (error) {
      throw error
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
      throw error
    }
  }

  @Post()
  async addPersonToAlert(@Param() alertId: string,@Param() personId: string): Promise<Alert> {
    const alert = await this.findOneById(alertId)

    if (!alert) throw new Error('Alert not found')

    const personExists = await this.personService.findOneById(personId)

    if (!personExists) throw new Error('Person not found')

    if (!alert.assignedPersonId) {
      alert.persons = []
      alert.persons.push(personExists)
      this.personService.assignAlertId(personId, alertId)
    }
    else throw new Error('Alert already has an assigned person')

    return this.alertRepository.save(alert)
  }

  @Get()
  findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<Alert> {

      if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')

      // @ts-ignore
      return this.alertRepository.findOne({ _id: new ObjectId(id) })
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
