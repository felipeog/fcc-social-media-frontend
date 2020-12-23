import React from 'react'
import {
  InMemoryCache,
  createHttpLink,
  ApolloClient,
  ApolloProvider,
} from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
