import gql from 'graphql-tag';

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
`