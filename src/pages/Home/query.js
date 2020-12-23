import gql from 'graphql-tag'

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
