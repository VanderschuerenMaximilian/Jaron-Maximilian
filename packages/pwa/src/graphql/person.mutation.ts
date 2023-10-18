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