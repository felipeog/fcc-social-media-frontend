import React, { useState } from 'react'
import { Form, Button, Loader } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { observer } from 'mobx-react-lite'

import { useForm } from '../../hooks/useForm'
import FormErrorsList from '../../components/FormErrorsList'
import UserStore from '../../stores/UserStore'
import { LOGIN_MUTATION } from './query'

const Login = ({ history }) => {
  // state
  const [errors, setErrors] = useState({})

  // mutations
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: userData }) => {
      UserStore.login(userData)
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
  const renderPage = () => {
    if (loading) return <Loader active />

    return (
      <>
        <Form onSubmit={handleFormSubmit} noValidate autoComplete="off">
          <Form.Group widths="equal">
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
          </Form.Group>

          <Button type="submit" primary>
            Login
          </Button>
        </Form>

        <FormErrorsList errors={errors} />
      </>
    )
  }

  return (
    <div className="Login">
      <h1>Login</h1>

      {renderPage()}
    </div>
  )
}

export default observer(Login)
