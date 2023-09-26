import { Injectable } from '@nestjs/common'
import { BezoekerService } from 'src/bezoeker/bezoeker.service'
import { WerknemerService } from 'src/werknemer/werknemer.service'
import { Bezoeker } from 'src/bezoeker/entities/bezoeker.entity'

import * as bezoekers from './data/bezoekers.json' // set  "resolveJsonModule": true in tsconfig.json
import * as werknemers from './data/werknemers.json' // set  "resolveJsonModule": true in tsconfig.json
import { Werknemer } from 'src/werknemer/entities/werknemer.entity'

@Injectable()
export class SeedService {
  constructor(
    private bezoekerService: BezoekerService,
    private werknemersService: WerknemerService,
  ) {}

  async addBezoekersFromJson(): Promise<Bezoeker[]> {
    let theBezoeker: Bezoeker[] = []
    for (let bezoeker of bezoekers) {
      const b = new Bezoeker()
      b.name = bezoeker.name
      b.fullname = bezoeker.fullname
      b.email = bezoeker.email

      theBezoeker.push(b)
    }

    return this.bezoekerService.save(theBezoeker)
  }

  async deleteAllBezoekers(): Promise<void> {
    return this.bezoekerService.truncate()
  }

  async addWerknemersFromJson(): Promise<Werknemer[]> {
    let theWerknemer: Werknemer[] = []
    for (let werknemer of werknemers) {
      const b = new Werknemer()
      b.firstname = werknemer.firstname
      b.lastname = werknemer.lastname
      b.email = werknemer.email

      theWerknemer.push(b)
    }

    return this.werknemersService.saveAll(theWerknemer)
  }

  async deleteAllWerknemers(): Promise<void> {
    return this.werknemersService.truncate()
  }
}
