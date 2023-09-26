import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed:database:bezoekers',
    describe: 'Seed the database with bezoekers',
  })
  async seedBirds() {
    console.info('✔ Start seeding of bezoekers')
    const birds = await this.seedService.addBezoekersFromJson()
    console.info(`🧑 ${birds.length} bezoekers are added`)
  }

  @Command({
    command: 'seed:reset:bezoekers',
    describe: 'Delete all data from the bezoekers table',
  })
  async delete() {
    console.info('🔪 Start deleting bezoekers')
    await this.seedService.deleteAllBezoekers()
    console.info('❌ Removed bezoekers')
  }
}
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