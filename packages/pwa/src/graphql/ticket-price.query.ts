import type { TicketPrices as ITicketPrices } from "@/interfaces/ITicketPrices";
import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const GET_TICKET_PRICES: TypedDocumentNode<{ ticketPrices: ITicketPrices }> = gql`
query getTicketPrices {
    ticketPrices {
		id
        name
        description
        price
        minHeight
        maxHeight
    }
}
`;