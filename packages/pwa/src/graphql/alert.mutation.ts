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