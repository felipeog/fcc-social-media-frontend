import React from 'react'
import { ApolloProvider } from '@apollo/client'

import client from './client'

export default (props) => <ApolloProvider {...props} client={client} />
