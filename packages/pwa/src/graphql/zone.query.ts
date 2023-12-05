import type { Zone as IZone } from "@/interfaces/IZone";
import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const GET_ZONES: TypedDocumentNode<{ zones: IZone[] }> = gql`
query {
    zones {
		id
        name
        description
    }
}
`;

export const GET_ZONE_BY_ID: TypedDocumentNode<
  { zone: IZone },
  { zoneId: string | undefined }
> = gql`
  query getZone ($zoneId: String!) {
    zone (id: $zoneId) {
	    id
      name
      description
    }
  }
`;