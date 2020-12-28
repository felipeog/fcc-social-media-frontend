import { InMemoryCache, ApolloClient } from '@apollo/client'

import link from '../link'

const mergeIncoming = (_, incoming) => incoming

export default new ApolloClient({
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
