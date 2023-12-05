import type { TicketState as ITicketState } from "./ITicketState"

export interface Ticket {
    id: string
    name: string
    price: number
    peronId: string
    isActive: ITicketState
    validationId: string
    qrCode: string
    usableOn: Date
    createdAt: Date
    updatedAt: Date
}