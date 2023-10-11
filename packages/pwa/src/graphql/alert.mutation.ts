import { gql } from '@apollo/client'

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