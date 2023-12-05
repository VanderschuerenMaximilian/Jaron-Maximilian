import type { Ticket as ITicket } from "@/interfaces/ITicket";
import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const GET_TICKETS_BY_PERSON_ID: TypedDocumentNode<
    { ticketsByPersonId: ITicket[] },
    { personId: string | undefined }
> = gql`
    query ticketsByPersonId ($personId: String!) {
        ticketsByPersonId(personId: $personId) {
            id
            name
            price
            personId
            qrCode
            usableOn
        }
    }
`;

export const GET_TICKET_BY_VALIDATION_ID: TypedDocumentNode<
    { ticketByValidationId: ITicket },
    { validationId: string }
> = gql`
    query ticketByValidationId ($validationId: String!) {
        ticketByValidationId (validationId: $validationId) {
            id
            name
            personId
            validationId
            qrCode
            isActive
            usableOn
        }
    }
`;