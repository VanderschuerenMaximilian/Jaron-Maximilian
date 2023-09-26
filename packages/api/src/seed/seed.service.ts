import { Injectable } from '@nestjs/common'
import { BezoekerService } from 'src/bezoeker/bezoeker.service'
import { Bezoeker } from 'src/bezoeker/entities/bezoeker.entity'

import * as bezoekers from './data/bezoekers.json' // set  "resolveJsonModule": true in tsconfig.json

@Injectable()
export class SeedService {
  constructor(private bezoekerService: BezoekerService) {}

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
}
