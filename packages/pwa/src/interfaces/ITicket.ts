export interface ITicket {
    id: string
    name: string
    price: number
    peronId: string
    isActive: boolean
    validationId: string
    qrCode: string
    usableOn: Date
    createdAt: Date
    updatedAt: Date
}