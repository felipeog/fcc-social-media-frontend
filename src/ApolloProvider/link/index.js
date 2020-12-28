import { ApolloLink } from '@apollo/client/link/core'

import authLink from './authLink'
import errorLink from './errorLink'
import httpLink from './httpLink'

export default ApolloLink.from([authLink, errorLink, httpLink])
