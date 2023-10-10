import gql from 'graphql-tag'

export const GET_SHOPS = gql`
query {
  shops {
    id
    name
    image
    description
    dishes
    zone
    category {id, name, image}
    shopType
  }
}
`

export const GET_SHOP = gql`
query ($name:String!) {
  shopByName(name: $name) {
    id
    name
    image
    description
    dishes
    zone
    category {id, name, image}
    shopType
  }
}
`



