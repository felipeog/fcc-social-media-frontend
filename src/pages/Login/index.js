import React, { useState, useRef } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import ReCAPTCHA from 'react-google-recaptcha'

import { useForm } from '../../hooks/useForm'
import FormErrorsList from '../../components/FormErrorsList'
import ReCAPTCHAWrapper from '../../components/ReCAPTCHAWrapper'
import UserStore from '../../stores/UserStore'
import { LOGIN_MUTATION } from './query'

const Login = ({ history }) => {
  // state
  const [errors, setErrors] = useState({})

  // refs
  const recaptchaRef = useRef(null)

  // mutations
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: userData }) => {
      UserStore.login(userData)
      history.push('/')
    },
    onError: (err) => {
      recaptchaRef.current.reset()
      setErrors(err.graphQLErrors[0].extensions?.errors || {})
    },
  })

  // hooks
  const { values, handleInputChange, handleFormSubmit } = useForm({
    callback: () => {
      const recaptchaToken = recaptchaRef.current.getValue()
      login({ variables: { loginInput: { ...values, recaptchaToken } } })
    },
    initialState: {
      username: '',
      password: '',
    },
  })

  // rendering
  return (
    <div className="Login">
      <h1>Login</h1>

      <Form onSubmit={handleFormSubmit} loading={loading} noValidate>
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

        <ReCAPTCHAWrapper>
          <ReCAPTCHA
            sitekey={process.env.RECAPTCHA_KEY}
            ref={recaptchaRef}
            hl="en"
          />
        </ReCAPTCHAWrapper>

        <Button type="submit" primary>
          Login
        </Button>
      </Form>

      <FormErrorsList errors={errors} />
    </div>
  )
}

export default observer(Login)
