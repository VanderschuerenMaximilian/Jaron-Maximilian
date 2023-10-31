import gql from "graphql-tag";

export const GET_ZONES = gql`
query {
    zones {
		id
        name
        description
    }
}
`;