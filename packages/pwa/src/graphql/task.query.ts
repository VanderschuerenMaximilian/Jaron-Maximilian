import gql from 'graphql-tag'

export const GET_TASKS = gql`
query {
    tasks {
      id
      persons { id, fullName, profilePicture }
      workblockId
      title
      description
      createdAt
      shopName
      stockItems {
        name
        difference
      }
    }
  }
`;	