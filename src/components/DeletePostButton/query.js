import { gql } from '@apollo/client'

export const DELETE_POST_MUTATION = gql`
  mutation deleteButton_deletePostMutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const POSTS_QUERY = gql`
  query deleteButton_postsQuery {
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
