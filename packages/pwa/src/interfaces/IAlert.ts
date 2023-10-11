export interface Alert {
    id?: string;
    title: string;
    description: string;
    state?: string;
    persons?: Person[];
    personId?: string;
    createdBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}