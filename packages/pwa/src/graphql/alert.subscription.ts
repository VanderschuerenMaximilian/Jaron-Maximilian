import { gql, type TypedDocumentNode } from "@apollo/client/core";
import type { Alert as IAlert } from "@/interfaces/IAlert";

export const CREATED_ALERT: TypedDocumentNode<{ alertAdded: IAlert }> = gql`
subscription alertAdded {
    alertAdded {
        id
        title
        description
        zoneId
        state
        persons {
            id
            firstName
            lastName
            fullName
            workEmail
            personType
            jobType
        }
    }
}`;

export const PERSON_ASSIGNED_TO_ALERT: TypedDocumentNode<{ personAssignedToAlert: IAlert }> = gql`
subscription personAssignedToAlert {
    personAssignedToAlert {
        id
        title
        description
        zoneId
        state
        persons {
            id
            firstName
            lastName
            fullName
            workEmail
            personType
            jobType
        }
    }
}
`;