import { InMemoryCache, ApolloClient } from '@apollo/client'
import uniqBy from 'lodash/uniqBy'

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
              let newPosts

              if (!!args?.page) {
                // pagination, incoming posts go after existing posts
                newPosts = uniqBy(
                  [...existing.posts, ...incoming.posts],
                  '__ref'
                )
              } else {
                if (existing.posts.length > incoming.posts.length) {
                  // post deletion
                  newPosts = incoming.posts
                } else {
                  // post addition, incoming post go before existing posts
                  newPosts = uniqBy(
                    [...incoming.posts, ...existing.posts],
                    '__ref'
                  )
                }
              }

              return {
                ...incoming,
                posts: newPosts,
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
