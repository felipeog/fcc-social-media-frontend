import React, { useState } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../../hooks/useForm'
import { CREATE_COMMENT_MUTATION } from './query'

const CommentForm = ({ postId }) => {
  // state
  const [errors, setErrors] = useState({})

  // mutations
  const [createComment, { loading, error }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      onCompleted: () => {
        resetForm()
        setErrors({})
      },
      onError: (err) => {
        setErrors(err.graphQLErrors[0].extensions?.errors || {})
      },
    }
  )

  // hooks
  const { values, handleFormSubmit, handleInputChange, resetForm } = useForm({
    callback: () => createComment({ variables: { postId, ...values } }),
    initialState: { body: '' },
  })

  // rendering
  const renderErrors = () => {
    const hasErrors = Object.keys(errors || {}).length > 0

    if (hasErrors) return <Message error list={Object.values(errors)} />
  }

  return (
    <div className="CommentForm">
      <h2>Create a comment</h2>

      <Form loading={loading} onSubmit={handleFormSubmit}>
        <Form.Field>
          <Form.Input
            name="body"
            onChange={handleInputChange}
            error={!!error}
            value={values.body}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>

      {renderErrors()}
    </div>
  )
}

export default CommentForm
