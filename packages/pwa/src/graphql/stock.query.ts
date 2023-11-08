import gql from 'graphql-tag';

export const ALL_STOCKS = gql`
    query GetAllStocks {
        stocks {
        id
        facilityName
        name
        price
        stock
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