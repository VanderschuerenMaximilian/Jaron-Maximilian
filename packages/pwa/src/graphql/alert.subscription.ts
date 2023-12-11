import { gql, type TypedDocumentNode } from "@apollo/client/core";
import type { Alert as IAlert } from "@/interfaces/IAlert";
import type { Person as IPerson } from "@/interfaces/IPerson";

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

export const PERSON_ASSIGNED_TO_ALERT: TypedDocumentNode<{ personAssignedToAlert: IPerson }> = gql`
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