import gql from 'graphql-tag';

export const ALL_EMPLOYEES = gql`
    query {
        werknemers {
            id
            firstname
            lastname
            email
        }
    }
`;