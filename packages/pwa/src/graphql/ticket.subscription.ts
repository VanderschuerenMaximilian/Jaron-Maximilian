import gql from 'graphql-tag';

export const ADDED_TICKETS = gql`
    subscription ticketsAdded {
        ticketsAdded {
            id
            name
            price
            personId
            qrCode
            usableOn
        }
    }
`;