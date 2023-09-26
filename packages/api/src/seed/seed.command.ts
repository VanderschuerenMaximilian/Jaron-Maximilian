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
