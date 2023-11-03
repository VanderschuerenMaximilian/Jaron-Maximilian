import gql from 'graphql-tag';

export const ALL_ALERTS = gql`
    query {
        alerts {
            title
            description
            zoneId
            state
            createdBy
    }
    }
`;

export const FIND_ALERT_BY_ID = gql`
    query alertById($alertId: String!) {
        alert (id: $alertId) {
            id
            title
            description
            zoneId
            state
            persons {
                id
                firstName
                lastName
            }
        }
    }
`;