import type { Person } from './IPersons';

export interface Alert {
    id?: string;
    title: string;
    description: string;
    state?: string;
    persons?: Person[];
    personId?: string;
    zoneId?: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Alerts {
    alerts: Alert[];
}