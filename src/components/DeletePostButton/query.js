import { gql } from '@apollo/client'

export const DELETE_POST_MUTATION = gql`
  mutation deletePostButton_deletePostMutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const POSTS_QUERY = gql`
  query deletePostButton_postsQuery {
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
