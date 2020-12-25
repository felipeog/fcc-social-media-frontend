import React from 'react'
import {
  InMemoryCache,
  createHttpLink,
  ApolloClient,
  ApolloProvider,
} from '@apollo/client'
import { setContext } from 'apollo-link-context'

import { LS_TOKEN_KEY } from './consts'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
})

const authLink = setContext(() => {
  const token = localStorage.getItem(LS_TOKEN_KEY)

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            merge: (_, incoming) => incoming,
          },
        },
      },
    },
  }),
})

export default ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
