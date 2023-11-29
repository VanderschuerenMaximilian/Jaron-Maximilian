import { gql } from 'graphql-tag'

export const CREATE_TASK = gql`
mutation ($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      id
      persons { id, fullName, profilePicture }
      workblockId
      title
      description
      completed
      createdAt
      shopName
      stockItems {
        name
        difference
      }
    }
  }
`;	

export const UPDATE_TASK = gql`
mutation updateTaskInput ($updateTaskInput: UpdateTaskInput!) {
  updateTask (updateTaskInput: $updateTaskInput) {
    id
    persons { id, fullName, profilePicture }
  }
}
`;