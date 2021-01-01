import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

import { useForm } from '../../hooks/useForm'
import FormErrorsList from '../FormErrorsList'
import './index.scss'

const PostForm = ({ createPost, loading, error }) => {
  // state
  const [errors, setErrors] = useState({})

  // hooks
  const { values, handleFormSubmit, handleInputChange, resetForm } = useForm({
    callback: () => {
      createPost({ variables: { ...values } })
      resetForm()
      setErrors({})
    },
    initialState: { body: '' },
  })

  // rendering
  return (
    <div className="PostForm">
      <h1>Create a post</h1>

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

export default PostForm
