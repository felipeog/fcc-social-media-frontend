import { gql } from '@apollo/client'

export const LIKE_MUTATION = gql`
  mutation likePostButton_likeMutation($postId: ID!) {
    likePost(postId: $postId) {
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
