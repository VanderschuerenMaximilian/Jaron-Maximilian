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

export const GET_ZONE_BY_ID = gql`
query getZone ($zoneId: String!) {
  zone (id: $zoneId) {
	id
    name
    description
  }
}
`;