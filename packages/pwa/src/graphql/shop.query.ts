import gql from 'graphql-tag'

export const GET_SHOPS = gql`
query {
  shops {
    id
    name
    image
    description
    products {id}
    zone
    category {id}
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
    products {id, name, image, description, price, sizeModifier, category, size, sauce {name, stock, stockReduction}, extra {name, stock, stockReduction}, removable, ingredients {name, stock, stockReduction}, shopType}
    zone
    category {id, name, image}
    shopType
  }
}
`

export const CREATE_ORDER = gql`
mutation CreateOrderByVariables($orderInput: CreateOrderInput!) {
  createOrder(createOrderInput: $orderInput) {
    id
    shopName
    totalPrice
    createdAt
    soldProducts {
      productName
      price
      size
      sauce
      amount
      removeables
      extras
    }
  }
}
`



