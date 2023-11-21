import gql from "graphql-tag";

export const CREATE_TICKETS = gql`
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

export const UPDATE_TICKET = gql`
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