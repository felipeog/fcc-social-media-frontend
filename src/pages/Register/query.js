import { gql } from '@apollo/client'

export const REGISTER_MUTATION = gql`
  mutation register_registerMutation($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      email
      token
      username
      createdAt
    }
  }
`
