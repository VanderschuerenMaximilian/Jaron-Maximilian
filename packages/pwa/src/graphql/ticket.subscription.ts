import type { Ticket as ITicket } from "@/interfaces/ITicket";
import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const ADDED_TICKETS: TypedDocumentNode<{ ticketsAdded: ITicket[] }> = gql`
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