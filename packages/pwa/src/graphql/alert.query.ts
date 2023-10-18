import gql from 'graphql-tag';

export const ALL_ALERTS = gql`
    query {
        alerts {
            title
            description
            state
            createdBy
    }
    }
`;