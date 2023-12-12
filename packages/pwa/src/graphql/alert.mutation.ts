import type { Alert } from "@/interfaces/IAlert";
import { gql, type TypedDocumentNode } from "@apollo/client/core";

export const CREATE_ALERT: TypedDocumentNode<{
    createAlertInput: {
        title: string
        description: string
        zoneId: string
        createdBy: string
    }
}> = gql`
    mutation ($createAlertInput: CreateAlertInput!) {
        createAlert(createAlertInput: $createAlertInput) {
            id
            title
            description
            zoneId
            createdBy
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_ALERT_STATE: TypedDocumentNode<{
    updateAlertStateInput: {
        id: string
        state: string
        assignedPersonId: string
    }
}> = gql`
    mutation updateAlert ($updateAlertInput: UpdateAlertInput!) {
        updateAlert (updateAlertInput: $updateAlertInput) {
            id
            title
            description
            persons {
                lastName
                fullName
            }
            state
            createdBy
            updatedAt
        }
    }
`;

export const ADD_PERSON_TO_ALERT: TypedDocumentNode<
{   
    alertId: string
    personId: string 
    addPersonToAlert: Alert
}
> = gql`
    mutation addPersonToAlert ($alertId: String!, $personId: String!){
        addPersonToAlert (alertId: $alertId, personId: $personId) {
            title
            description
            persons {
                id
                firstName
                lastName
                fullName
                personType
                jobType
                workEmail
                phone
                assignedAlerts
                profilePicture
            }
        }
    }
`;

export const REMOVE_PERSON_FROM_ALERT: TypedDocumentNode<
{
    alertId: string
    personId: string
    removePersonFromAlert: Alert
}> = gql`
mutation removePersonFromAlert ($alertId: String!, $personId: String!) {
  removePersonFromAlert (alertId: $alertId, personId: $personId) {
    title
    description
    persons {
      firstName
      lastName
      assignedAlerts
    }
  }
}
`;