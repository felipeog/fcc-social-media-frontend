import gql from 'graphql-tag'

export const LIKE_MUTATION = gql`
  mutation postCard_likeMutation($postId: ID!) {
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
