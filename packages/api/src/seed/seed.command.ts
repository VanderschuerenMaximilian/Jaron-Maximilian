import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed:database:persons',
    describe: 'Seed the database with persons',
  })
  async seedPersons() {
    console.info('🪴 Start seeding of persons')
    const persons = await this.seedService.addPersonsFromJson()
    console.info(`🧑 ${persons.length} persons are added`)
  }

  @Command({
    command: 'seed:reset:persons',
    describe: 'Delete all data from the persons table',
  })
  async deletePersons() {
    console.info('🔪 Start deleting persons')
    await this.seedService.deleteAllPersons()
    console.info('❌ Removed persons')
  }

  @Command({
    command: 'seed:database:alerts',
    describe: 'Seed the database with alerts',
  })
  async seedAlerts() {
    console.info('🪴 Start seeding of alerts')
    await this.seedService.addAlertsFromJson()
    console.info('🚨 Alerts are added')
  }

  @Command({
    command: 'seed:reset:alerts',
    describe: 'Delete all data from the alerts table',
  })
  async deleteAlerts() {
    console.info('🔪 Start deleting alerts')
    await this.seedService.deleteAllAlerts()
    console.info('❌ Removed alerts')
  }
}

