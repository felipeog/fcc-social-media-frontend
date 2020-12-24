import { gql } from '@apollo/client'

export const CREATE_POST_MUTATION = gql`
  mutation postForm_createPostMutation($body: String!) {
    createPost(body: $body) {
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

export const POSTS_QUERY = gql`
  query postForm_postsQuery {
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
