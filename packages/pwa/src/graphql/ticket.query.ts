import gql from "graphql-tag";

export const GET_TICKETS_BY_PERSON_ID = gql`
    query ticketsByPersonId ($personId: String!) {
        ticketsByPersonId(personId: $personId) {
            id
            name
            price
            personId
            qrCode
            expiresAt
        }
    }
`;