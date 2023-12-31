import gql from 'graphql-tag';

export const ALL_STOCKS = gql`
    query GetAllStocks {
        stocks {
        id
        facilityName
        name
        price
        stock
        pending
        stockReduction
        unit
        minStock
        maxStock 
        }
    }
`;

export const GET_STOCKS_BY_FACILITYNAME = gql`
    query GetStocksByFacilityName ($facilityName: String!) {
        stocksByFacilityName (facilityName: $facilityName) {
        id
        facilityName
        name
        price
        stock
        pending
        stockReduction
        unit
        minStock
        maxStock
    }
    }
`;

export const GET_FACILITYNAMES = gql`
query uniqueFacilityNames {
    uniqueFacilityNames
  }
`;

export const UPDATE_STOCK_WITH_PENDING = gql`
mutation UpdateStockWithPending($facilityName: String!, $ingredients: [StockInput!]!) {
  updateStockWithPending(facilityName: $facilityName, ingredients: $ingredients) {
    id
    facilityName
    name
    price
    stock
    pending
    stockReduction
    unit
    minStock
    maxStock
  }
}
`;

export const REMOVE_PENDING = gql`
mutation removePending($facilityName: String!,$isUndone: Boolean!, $stockItems: [StockInput!]!) {
  removePending(facilityName: $facilityName,isUndone: $isUndone, stockItems: $stockItems) {
    name
    stock
    pending
  }
}
`;

