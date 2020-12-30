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
            keyArgs: false,
            merge: (
              existing = { posts: [] },
              incoming = { posts: [] },
              { args }
            ) => {
              console.log({ args })
              if (!args?.page || args.page === 1) {
                return incoming
              }

              return {
                ...incoming,
                posts: [...existing.posts, ...incoming.posts],
              }
            },
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
