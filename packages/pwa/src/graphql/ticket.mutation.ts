import type { Ticket as ITicket } from "@/interfaces/ITicket";
import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const CREATE_TICKETS: TypedDocumentNode<
    { createTickets: ITicket[] },
    {   ticketsInput: {
            price: number
            name: string
            personId?: string
            confirmationEmail?: string
            usableOn: Date
        }[]
    }
> = gql`
    mutation ($ticketsInput: [CreateTicketInput!]!) {
        createTickets(createTicketsInput: $ticketsInput) {
            id
            name
            price
            personId
            isActive
            usableOn
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_TICKET: TypedDocumentNode<
    { updateTicket: ITicket },
    { updateTicketInput: {
        id: string
        validationId: string
    }}
> = gql`
    mutation updateTicket ($updateTicketInput: UpdateTicketInput!) {
        updateTicket(updateTicketInput: $updateTicketInput) {
            id
            validationId
            qrCode
            name
            isActive
        }
    }
`;