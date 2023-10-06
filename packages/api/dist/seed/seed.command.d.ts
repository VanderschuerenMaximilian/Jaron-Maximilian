import { SeedService } from './seed.service';
export declare class DatabaseSeedCommand {
    private readonly seedService;
    constructor(seedService: SeedService);
    seedPersons(): Promise<void>;
    deletePersons(): Promise<void>;
    seedAlerts(): Promise<void>;
    deleteAlerts(): Promise<void>;
}
