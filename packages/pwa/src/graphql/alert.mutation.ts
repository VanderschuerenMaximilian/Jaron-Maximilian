import { gql } from 'graphql-tag'

export const CREATE_ALERT = gql`
    mutation ($createAlertInput: CreateAlertInput!) {
        createAlert(createAlertInput: $createAlertInput) {
            id
            title
            description
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