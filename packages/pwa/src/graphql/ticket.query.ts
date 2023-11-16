import gql from "graphql-tag";

export const GET_TICKETS_BY_PERSON_ID = gql`
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

export const GET_TICKET_BY_VALIDATION_ID = gql`
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