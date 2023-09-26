import { Injectable } from '@nestjs/common'
import { BezoekerService } from 'src/bezoeker/bezoeker.service'
import { Bezoeker } from 'src/bezoeker/entities/bezoeker.entity'

import * as bezoekers from './data/bezoekers.json' // set  "resolveJsonModule": true in tsconfig.json
import { WerknemerService } from 'src/werknemer/werknemer.service';
import { Werknemer } from 'src/werknemer/entities/werknemer.entity';

import * as werknemers from './data/werknemers.json';

@Injectable()
export class SeedService {}
