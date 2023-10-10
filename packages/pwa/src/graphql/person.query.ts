import gql from 'graphql-tag';

export const ALL_PERSONS = gql`
    query {
        persons {
            id
            firstName
            lastName
            fullName
            personalEmail
            workEmail
            phone
            personType
            jobType
        }
    }
`;

export const FIND_PERSON_BY_ID = gql`
    query person($id: String!){
        person(id: $id) {
            id
            userId
            firstName
            lastName
            fullName
            personType
            jobType
            personalEmail
            workEmail
            phone
        }
    }
`;

export const ALL_EMPLOYEES = gql`
    query personsByPersonType($personType: String!) {
        personsByPersonType(personType: $personType) {
            id
            firstName
            lastName
            fullName
            personalEmail
            workEmail
            phone
            personType
            jobType
        }
    }
`;

export const FIND_EMPLOYEES_BY_SEARCH = gql`
    query ($searchString: String!) {
        personsBySearchString(searchString: $searchString) {
            id
            firstName
            lastName
            fullName
            personalEmail
            workEmail
            personType
            jobType
        }
    }
`;

export const FIND_EMPLOYEES_BY_JOB_TYPE = gql`
    query ($jobType: String!) {
        personsByJobType(jobType: $jobType) {
            id
            firstName
            lastName
            fullName
            personalEmail
            personType
            jobType
        }
    }
`;

// export const UPDATE_PERSON = gql`

// `;

export const DELETE_PERSON = gql`
    mutation ($id: String!) {
        removePerson(id: $id) {
            __typename
        }
    }
`;