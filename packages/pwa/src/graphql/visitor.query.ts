import gql from 'graphql-tag';

export const ALL_VISITORS = gql`
    query {
        bezoekers {
            id
            name
            fullname
            email
        }
    }
`;