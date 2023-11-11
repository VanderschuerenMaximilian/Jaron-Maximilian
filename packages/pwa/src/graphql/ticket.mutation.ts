import gql from "graphql-tag";

export const CREATE_TICKETS = gql`
    mutation ($ticketsInput: [CreateTicketInput!]!) {
        createTickets(createTicketsInput: $ticketsInput) {
            id
            name
            price
            personId
            isActive
            expiresAt
            createdAt
            updatedAt
        }
    }
`;