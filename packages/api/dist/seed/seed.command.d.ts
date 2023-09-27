import { SeedService } from './seed.service';
export declare class DatabaseSeedCommand {
    private readonly seedService;
    constructor(seedService: SeedService);
    seedBezoekers(): Promise<void>;
    deleteBezoekers(): Promise<void>;
    seedWerknemers(): Promise<void>;
    deleteWerknemers(): Promise<void>;
}
