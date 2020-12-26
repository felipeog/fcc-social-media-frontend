import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../../hooks/useForm'
import FormErrorsList from '../FormErrorsList'
import { CREATE_COMMENT_MUTATION } from './query'
import './index.scss'

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
            action={{
              color: 'teal',
              content: 'Submit',
            }}
          />
        </Form.Field>
      </Form>

      <FormErrorsList errors={errors} />
    </div>
  )
}

export default CommentForm
