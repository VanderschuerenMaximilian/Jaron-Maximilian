import gql from 'graphql-tag'

export const GET_TASKS = gql`
query {
    tasks {
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