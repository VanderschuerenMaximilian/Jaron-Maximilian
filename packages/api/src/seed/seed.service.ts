import { Injectable } from '@nestjs/common';
import { WerknemerService } from 'src/werknemer/werknemer.service';
import { Werknemer } from 'src/werknemer/entities/werknemer.entity';

import * as werknemers from './data/werknemers.json';

@Injectable()
export class SeedService {
    constructor(
        private werknemerService: WerknemerService,
    ) {}

    async addWerknemersFromJson(): Promise<Werknemer[]> {
        let theWerknemers: Werknemer[] = [];

        for (let werknemer of werknemers) {
            const newWerknemer = new Werknemer();
            newWerknemer.firstname = werknemer.firstname;
            newWerknemer.lastname = werknemer.lastname;
            newWerknemer.email = werknemer.email;

            theWerknemers.push(newWerknemer)
        }

        return await this.werknemerService.saveAll(theWerknemers);
    }

    async deleteAllWerknemers(): Promise<void> {
        await this.werknemerService.truncate();
    }
}
