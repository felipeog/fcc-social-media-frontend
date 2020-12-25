import { gql } from '@apollo/client'

export const CREATE_COMMENT_MUTATION = gql`
  mutation commentForm_createCommentMutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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
