import { gql } from '@apollo/client'

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteCommentButton_deleteCommentMutation(
    $postId: ID!
    $commentId: ID!
  ) {
    deleteComment(postId: $postId, commentId: $commentId) {
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
