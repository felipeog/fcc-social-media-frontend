import React, { useState, useRef } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import ReCAPTCHA from 'react-google-recaptcha'

import { useForm } from '../../hooks/useForm'
import FormErrorsList from '../../components/FormErrorsList'
import ReCAPTCHAWrapper from '../../components/ReCAPTCHAWrapper'
import UserStore from '../../stores/UserStore'
import { REGISTER_MUTATION } from './query'

const Register = ({ history }) => {
  // state
  const [errors, setErrors] = useState({})

  // refs
  const recaptchaRef = useRef(null)

  // mutations
  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: ({ register: userData }) => {
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
      register({ variables: { registerInput: { ...values, recaptchaToken } } })
    },
    initialState: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  //rendering
  return (
    <div className="Register">
      <h1>Register</h1>

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
            label="Email"
            name="email"
            type="email"
            value={values.email}
            error={!!errors.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
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
        </Form.Group>

        <ReCAPTCHAWrapper>
          <ReCAPTCHA
            sitekey={process.env.RECAPTCHA_KEY}
            ref={recaptchaRef}
            hl="en"
          />
        </ReCAPTCHAWrapper>

        <Button type="submit" primary>
          Register
        </Button>
      </Form>

      <FormErrorsList errors={errors} />
    </div>
  )
}

export default observer(Register)
