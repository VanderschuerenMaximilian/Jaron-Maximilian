export interface Zones {
    zones: Zone[];
}

export interface Zone {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}