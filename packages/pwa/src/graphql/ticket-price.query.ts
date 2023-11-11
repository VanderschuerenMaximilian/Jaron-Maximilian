import gql from "graphql-tag";

export const GET_TICKET_PRICES = gql`
query getTicketPrices {
    ticketPrices {
		id
        name
        description
        price
    }
}
`;