import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  split,
  from,
} from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import useFirebase from '../composables/useFirebase'
import { getMainDefinition } from '@apollo/client/utilities'

const { firebaseUser } = useFirebase()

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin',
})

const errorLink = onError(error => {
  if (import.meta.env.DEV) logErrorMessages(error)
})

// Assuming you want to use Apollo Client with the auth link
const authLink = setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${await firebaseUser.value?.getIdToken()
      // .then((token) => console.log('{"Authorization": ' + '"' + 'Bearer ' + token + '"' + "}"))
    }`,
  },
}))

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/graphql',
  }),
)

const link = split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  )
}, wsLink, from([authLink, httpLink, errorLink]))

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})

export default () => {
  return {
    apolloClient,
    wsLink,
  }
}
