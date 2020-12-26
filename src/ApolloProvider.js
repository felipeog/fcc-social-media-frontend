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

const mergeIncoming = (_, incoming) => incoming
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            merge: mergeIncoming,
          },
        },
      },
      Post: {
        fields: {
          comments: {
            merge: mergeIncoming,
          },
          likes: {
            merge: mergeIncoming,
          },
        },
      },
    },
  }),
})

export default (props) => <ApolloProvider {...props} client={client} />
