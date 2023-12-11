import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const CREATE_PERSON: TypedDocumentNode<{
    createPersonInput: {
        firstName: string
        lastName: string
        personalEmail: string
        workEmail: string
        phone: string
        personType: string
        locale: string
        jobType?: string
    }
}> = gql`
    mutation ($createPersonInput: CreatePersonInput!) {
        createPerson(createPersonInput: $createPersonInput) 
        {
            id
            firstName
            lastName
            fullName
            personalEmail
            workEmail
            phone
            personType
            createdAt
        }
    }
`

export const UPDATE_NAV_CONTAINER_STATE: TypedDocumentNode<{
    updateNavContainerStateInput: {
        id: string
        navContainerState: string
    }
}> = gql`
  mutation updateNavContainerState ($updateNavContainerStateInput: UpdateNavContainerStateInput!) {
	  updateNavContainerState (updateNavContainerStateInput: $updateNavContainerStateInput) {
      id
		  fullName
      personType
      navContainerState
    }
  }
`;

export const UPDATE_LOCALE: TypedDocumentNode<
{ personId: string },
{ locale: string }
> = gql`
mutation updateLocale($personId: String!, $locale: String!){
	updateLocale (id:$personId, locale: $locale) {
    id
    uid
    fullName
    locale
  }
}
`;