import { Injectable } from '@nestjs/common'

import * as persons from './data/persons.json' // set  "resolveJsonModule": true in tsconfig.json
import * as alerts from './data/alerts.json' // set  "resolveJsonModule": true in tsconfig.json
import { PersonsService } from 'src/persons/persons.service'
import { Person } from 'src/persons/entities/person.entity'
import { PersonType } from 'src/interfaces/IPersonType'
import { Alert } from 'src/alerts/entities/alert.entity'
import { AlertsService } from 'src/alerts/alerts.service'
import { JobType } from 'src/interfaces/IJobType'
import { AlertState } from 'src/interfaces/IAlertState'

@Injectable()
export class SeedService {
  constructor(
    private personsService: PersonsService,
    private alertsService: AlertsService
  ) {
  }

  async addPersonsFromJson(): Promise<Person[]> {
    let thePersons: Person[] = []
    for (let person of persons) {
      const p = new Person()
      p.firstName = person.firstName
      p.lastName = person.lastName
      p.fullName = person.fullName
      p.workEmail = person.workEmail
      p.personalEmail = person.personalEmail
      p.phone = person.phone
      p.jobType = person.jobType as JobType
      p.personType = person.personType as PersonType
      p.createdAt = new Date()
      p.updatedAt = new Date()

      thePersons.push(p)
    }

    return this.personsService.saveAllPersons(thePersons)
  }

  async deleteAllPersons(): Promise<void> {
    return this.personsService.truncate()
  }

  async addAlertsFromJson(): Promise<Alert[]> {
    let theAlerts: Alert[] = []
    for (let alert of alerts) {
      const a = new Alert()
      a.title = alert.title
      a.description = alert.description
      a.state = alert.state as AlertState
      a.createdBy = alert.createdBy
      a.employees = alert.employees
      a.assignedEmployee = alert.assignedEmployee
      a.createdAt = new Date()
      a.updatedAt = new Date()

      theAlerts.push(a)
    }

    return this.alertsService.saveAllAlerts(theAlerts)
  }

  async deleteAllAlerts(): Promise<void> {
    return this.alertsService.truncate()
  }
}
