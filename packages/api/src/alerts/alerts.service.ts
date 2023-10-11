import { Injectable } from '@nestjs/common';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { Repository } from 'typeorm';
import { AlertState } from 'src/interfaces/IAlertState';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
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

  // update(id: string, updateAlertInput: UpdateAlertInput) {
  //   try {
  //     const a = new Alert()
  //     a.id = id
  //     a.title = updateAlertInput.title
  //     a.description = updateAlertInput.description
  //     a.state = updateAlertInput.state
  //     a.createdBy = updateAlertInput.createdBy
  //     a.updatedAt = new Date()
  //     return this.alertRepository.save(a)
  //   } catch (error) {
  //     throw error
  //   }
  // }

  findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} alert`;
  }

  update(id: number, updateAlertInput: UpdateAlertInput) {
    return `This action updates a #${id} alert`;
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
