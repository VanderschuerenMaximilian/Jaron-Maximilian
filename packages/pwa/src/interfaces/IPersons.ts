export interface Persons {
    persons: Person[],
    personsByPersonType: Person[]
    personsBySearchString: Person[]
}

export interface Person {
    id: string
    uid: string,
    firstName: string,
    lastName: string,
    fullName: string,
    personalEmail: string,
    workEmail: string,
    phone: string,
    personType: string,
    jobType: string,
    createdAt: string,
    updatedAt: string,
    assignedAlerts: string[]
}