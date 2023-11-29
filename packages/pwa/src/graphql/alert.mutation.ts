import { gql } from 'graphql-tag'

export const CREATE_ALERT = gql`
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

export const UPDATE_ALERT_STATE = gql`
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

export const ADD_PERSON_TO_ALERT = gql`
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
            }
        }
    }
`;