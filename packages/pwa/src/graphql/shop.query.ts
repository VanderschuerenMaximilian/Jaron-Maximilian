import gql from 'graphql-tag'

export const GET_SHOPS = gql`
query {
  shops {
    id
    name
    image
    description
    products {id, name}
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
    products {id, name, image, description, price, category, size, sauce, extra, removable, ingredients, shopType}
    zone
    category {id, name, image}
    shopType
  }
}
`



