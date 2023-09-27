import { BezoekerService } from 'src/bezoeker/bezoeker.service';
import { WerknemerService } from 'src/werknemer/werknemer.service';
import { Bezoeker } from 'src/bezoeker/entities/bezoeker.entity';
import { Werknemer } from 'src/werknemer/entities/werknemer.entity';
export declare class SeedService {
    private bezoekerService;
    private werknemersService;
    constructor(bezoekerService: BezoekerService, werknemersService: WerknemerService);
    addBezoekersFromJson(): Promise<Bezoeker[]>;
    deleteAllBezoekers(): Promise<void>;
    addWerknemersFromJson(): Promise<Werknemer[]>;
    deleteAllWerknemers(): Promise<void>;
}
