import { gql } from '@apollo/client'

export const POSTS_QUERY = gql`
  query home_postsQuery($page: Int, $limit: Int) {
    getPosts(page: $page, limit: $limit) {
      posts {
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

      totalCount
      hasNextPage
      nextPage
    }
  }
`

export const CREATE_POST_MUTATION = gql`
  mutation home_createPostMutation($body: String!) {
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
