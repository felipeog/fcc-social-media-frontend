import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation login_loginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
      createdAt
    }
  }
`
