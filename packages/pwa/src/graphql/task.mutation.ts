import { gql } from 'graphql-tag'

export const CREATE_TASK = gql`
mutation ($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      id
      personId
      shopName
      title
      description
      createdAt
      stockItems {
        name
        difference
      }
    }
  }
`;	