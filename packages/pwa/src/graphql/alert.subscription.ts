import gql from 'graphql-tag';

export const CREATED_ALERT = gql`
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

export const PERSON_ASSIGNED_TO_ALERT = gql`
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