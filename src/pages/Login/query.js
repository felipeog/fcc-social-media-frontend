import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
  mutation login_loginMutation($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
      email
      token
      username
      createdAt
    }
  }
`
