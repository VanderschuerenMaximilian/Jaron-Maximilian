import gql from 'graphql-tag';

export const ALL_STOCKS = gql`
    query GetAllStocks {
        stocks {
        id
        facilityId
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