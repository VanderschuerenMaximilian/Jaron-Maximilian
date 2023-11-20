import gql from 'graphql-tag'

export const GET_TASKS = gql`
query {
    tasks {
      id
      persons { id, fullName }
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