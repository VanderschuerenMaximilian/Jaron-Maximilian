import { gql, type TypedDocumentNode } from "@apollo/client/core";
import type { Person as IPerson } from "@/interfaces/IPerson";

export const ALL_PERSONS: TypedDocumentNode<{ persons: IPerson[] }> = gql`
    query {
        persons {
            id
            userId
            firstName
            lastName
            fullName
            personType
            jobType
            profilePicture
            personalEmail
            workEmail
            phone
            assignedAlerts
            navContainerState
        }
    }
`;

export const FIND_PERSON_BY_ID: TypedDocumentNode<
{ 
    id: string,
    person: IPerson
}
> = gql`
    query person($id: String!){
        person(id: $id) {
            id
            userId
            firstName
            lastName
            fullName
            profilePicture
            personType
            jobType
            personalEmail
            workEmail
            phone
            assignedAlerts
            navContainerState
        }
    }
`;

export const FIND_PERSON_BY_UID: TypedDocumentNode<{ uid: string }> = gql`
    query ($uid: String!) {
        personByUid(uid: $uid) {
            id
            uid
            firstName
            lastName
            fullName
            profilePicture
            personType
            jobType
            personalEmail
            workEmail
            locale
            phone
            assignedAlerts
            navContainerState
        }
    }
`;

export const ALL_EMPLOYEES: TypedDocumentNode<{ persons: IPerson[] }> = gql`
    query personsByPersonType($personType: String!) {
        personsByPersonType(personType: $personType) {
            id
            firstName
            lastName
            fullName
            profilePicture
            personalEmail
            workEmail
            phone
            personType
            jobType
        }
    }
`;

export const FIND_EMPLOYEES_BY_SEARCH: TypedDocumentNode<{ persons: IPerson[] }> = gql`
    query ($searchString: String!) {
        personsBySearchString(searchString: $searchString) {
            id
            firstName
            lastName
            fullName
            profilePicture
            personalEmail
            workEmail
            personType
            jobType
        }
    }
`;

export const FIND_EMPLOYEES_BY_JOB_TYPE: TypedDocumentNode<{ persons: IPerson[] }> = gql`
    query ($jobType: String!) {
        personsByJobType(jobType: $jobType) {
            id
            firstName
            lastName
            fullName
            personalEmail
            personType
            jobType
            phone
        }
    }
`;