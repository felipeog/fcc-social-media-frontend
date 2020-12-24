import { gql } from '@apollo/client'

export const POSTS_QUERY = gql`
  query home_postsQuery {
    getPosts {
      body
      commentCount
      createdAt
      id
      likeCount
      username

      likes {
        createdAt
        id
        username
      }

      comments {
        body
        createdAt
        id
        username
      }
    }
  }
`
