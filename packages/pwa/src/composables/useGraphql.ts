import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import useFirebase from '../composables/useFirebase';

const {firebaseUser} = useFirebase();


const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
    credentials: 'same-origin',
});
Graphql.forRoot
const authLink = setContext(async (_, { headers }) => ({
    headers: {
        ...headers,
        authorization: `Bearer ${await firebaseUser.value?.getIdToken()
        // .then(async (token) => {console.log(`{"Authorization":"Bearer ${await firebaseUser.value?.getIdToken()}"}`)})
        }`
    }
})
);

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export default () => {
    
    return {
        apolloClient,
    }
}