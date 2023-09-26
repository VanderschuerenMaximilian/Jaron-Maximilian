import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed:database:werknemers',
    describe: 'Seed the database with werknemers',
  })
  async seedBirds() {
    console.info('🪺 Start seeding of birds')
    const werknemers = await this.seedService.addWerknemersFromJson()
    console.info(`🤷‍♂️ ${werknemers.length} Werknemers are added`);
  }

  @Command({
    command: 'seed:reset:werknemers',
    describe: 'Delete all data from the werknemer table',
  })
  async delete() {
    console.info('🔪 Start deleting werknemers')
    await this.seedService.deleteAllWerknemers()
    console.info('🪶 Removed werknemers')
  }
}