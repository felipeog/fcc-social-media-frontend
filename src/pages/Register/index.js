import React, { useContext, useState } from 'react'
import { Form, Button, Loader, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../../hooks/useForm'
import { UserContext } from '../../context/User'
import { REGISTER_MUTATION } from './query'

const Register = ({ history }) => {
  // state
  const [errors, setErrors] = useState({})

  // hooks
  const userContext = useContext(UserContext)
  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: ({ register: userData }) => {
      userContext.login(userData)
      history.push('/')
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions?.errors || {})
    },
  })
  const { values, handleInputChange, handleFormSubmit } = useForm({
    callback: () => register({ variables: { registerInput: { ...values } } }),
    initialState: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  //rendering
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
            label="Email"
            name="email"
            type="email"
            value={values.email}
            error={!!errors.email}
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

          <Form.Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            error={!!errors.confirmPassword}
            onChange={handleInputChange}
          />

          <Button type="submit" primary>
            Register
          </Button>
        </Form>

        {renderErrors()}
      </>
    )
  }

  return (
    <div className="Register">
      <h1>Register</h1>

      {renderPage()}
    </div>
  )
}

export default Register
