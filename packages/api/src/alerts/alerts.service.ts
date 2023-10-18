import { Injectable } from '@nestjs/common';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { AlertState } from 'src/interfaces/IAlertState';
import { PersonsService } from 'src/persons/persons.service';
import { UpdatePersonInput } from 'src/persons/dto/update-person.input';
import { Person } from 'src/persons/entities/person.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    private readonly personService: PersonsService,
  ) {}


  create(createAlertInput: CreateAlertInput): Promise<Alert> {
    try {
      const a = new Alert()
      a.title = createAlertInput.title
      a.description = createAlertInput.description
      a.state = AlertState.OPEN
      a.createdBy = createAlertInput.createdBy
      a.createdAt = new Date()
      a.updatedAt = new Date()
      return this.alertRepository.save(a)
    } catch (error) {
      throw error
    }
  }

  async update(alertId: string, updateAlertInput: UpdateAlertInput) {
    try {
      const toUpdateAlert = await this.findOne(alertId)
      const a = new Alert();
      a.id = toUpdateAlert.id
      a.title = toUpdateAlert.title
      a.description = toUpdateAlert.description
      a.state = updateAlertInput.state as AlertState
      a.createdBy = toUpdateAlert.createdBy
      a.updatedAt = new Date()

      return this.alertRepository.save(a)
    } catch (error) {
      throw error
    }
  }

  async addPersonToAlert(alertId: string, personId: string): Promise<Alert> {
    const alert = await this.findOne(alertId)

    if (!alert) throw new Error('Alert not found')

    const personExists = await this.personService.findOneById(personId)

    if (!personExists) throw new Error('Person not found')

    if (!alert.assignedPersonId) alert.persons.push(personExists)
    else throw new Error('Alert already has an assigned person')

    return this.alertRepository.save(alert)
  }

  findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  findOne(id: string): Promise<Alert> {
    // @ts-ignore
    return this.alertRepository.findOneBy({ _id: new ObjectId(id) })
  }

  remove(id: number) {
    return `This action removes a #${id} alert`;
  }

  //seeding alerts

  saveAllAlerts(alerts: any[]) {
    return this.alertRepository.save(alerts)
  }

  truncate() {
    return this.alertRepository.clear()
  }
}
