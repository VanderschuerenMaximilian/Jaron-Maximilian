import type { Person } from './IPerson';

export interface Alert {
    id?: string;
    title: string;
    description: string;
    state?: string;
    persons?: Person[];
    assignedPersonId?: string;
    zoneId?: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Alerts {
    alerts: Alert[];
    nonAssignedAlerts: Alert[];
}