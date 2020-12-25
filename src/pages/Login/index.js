import React, { useContext, useState } from 'react'
import { Form, Button, Loader, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../../hooks/useForm'
import { UserContext } from '../../context/User'
import { LOGIN_MUTATION } from './query'

const Login = ({ history }) => {
  // state
  const [errors, setErrors] = useState({})

  // context
  const userContext = useContext(UserContext)

  // mutations
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: userData }) => {
      userContext.login(userData)
      history.push('/')
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions?.errors || {})
    },
  })

  // hooks
  const { values, handleInputChange, handleFormSubmit } = useForm({
    callback: () => login({ variables: { ...values } }),
    initialState: {
      username: '',
      password: '',
    },
  })

  // rendering
  const renderErrors = () => {
    const hasErrors = Object.keys(errors || {}).length > 0

    if (hasErrors) return <Message error list={Object.values(errors)} />
  }

  const renderPage = () => {
    if (loading) return <Loader active />

    return (
      <>
        <Form onSubmit={handleFormSubmit} noValidate autoComplete="off">
          <Form.Input
            label="Username"
            name="username"
            type="text"
            value={values.username}
            error={!!errors.username}
            onChange={handleInputChange}
          />

          <Form.Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            error={!!errors.password}
            onChange={handleInputChange}
          />

          <Button type="submit" primary>
            Login
          </Button>
        </Form>

        {renderErrors()}
      </>
    )
  }

  return (
    <div className="Register">
      <h1>Login</h1>

      {renderPage()}
    </div>
  )
}

export default Login
