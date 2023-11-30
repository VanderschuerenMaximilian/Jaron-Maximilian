import { gql } from '@apollo/client/core';

export const CREATE_PERSON = gql`
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

export const UPDATE_NAV_CONTAINER_STATE = gql`
mutation updateNavContainerState ($updateNavContainerStateInput: UpdateNavContainerStateInput!) {
	updateNavContainerState (updateNavContainerStateInput: $updateNavContainerStateInput) {
    id
		fullName
    personType
    navContainerState
  }
}
`;

export const UPDATE_LOCALE = gql`
mutation updateLocale($personId: String!, $locale: String!){
	updateLocale (id:$personId, locale: $locale) {
    id
    uid
    fullName
    locale
  }
}
`;