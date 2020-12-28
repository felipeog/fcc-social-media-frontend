import React from 'react'
import { toast } from 'react-toastify'
import {
  InMemoryCache,
  createHttpLink,
  ApolloClient,
  ApolloProvider,
} from '@apollo/client'
import { ApolloLink } from '@apollo/client/link/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { LS_TOKEN_KEY, SESSION_EXPIRED_MESSAGE } from './consts'
import UserStore from './stores/UserStore'

const authLink = setContext(() => {
  const token = localStorage.getItem(LS_TOKEN_KEY)

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const stringify = (input) => JSON.stringify(input)
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path, extensions: { code } }) => {
      console.error('[GraphQL error]')
      console.group()
      console.error(`Message: ${stringify(message)}`)
      console.error(`Code: ${stringify(code)}`)
      console.error(`Operation: ${stringify(operation.operationName)}`)
      console.error(`Locations: ${stringify(locations)}`)
      console.error(`Path: ${stringify(path)}`)
      console.groupEnd()

      if (code === 'UNAUTHENTICATED') {
        UserStore.logout()
        toast(SESSION_EXPIRED_MESSAGE)
      }
    })
  }

  if (networkError) {
    console.error(`[Network error]: ${stringify(networkError)}`)
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
})

const link = ApolloLink.from([authLink, errorLink, httpLink])

const mergeIncoming = (_, incoming) => incoming
const client = new ApolloClient({
  link,
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
