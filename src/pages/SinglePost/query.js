import { gql } from '@apollo/client'

export const POST_QUERY = gql`
  query singlePost_postQuery($postId: ID!) {
    getPost(postId: $postId) {
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
