import { PersonsService } from 'src/persons/persons.service';
import { Person } from 'src/persons/entities/person.entity';
import { Alert } from 'src/alerts/entities/alert.entity';
import { AlertsService } from 'src/alerts/alerts.service';
export declare class SeedService {
    private personsService;
    private alertsService;
    constructor(personsService: PersonsService, alertsService: AlertsService);
    addPersonsFromJson(): Promise<Person[]>;
    deleteAllPersons(): Promise<void>;
    addAlertsFromJson(): Promise<Alert[]>;
    deleteAllAlerts(): Promise<void>;
}
