import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../../hooks/useForm'
import { CREATE_POST_MUTATION } from './query'

const PostForm = () => {
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: resetForm,
    onError: (err) => console.error('PostForm @ createPost >>>>>', err),
  })
  const { values, handleFormSubmit, handleInputChange, resetForm } = useForm({
    callback: () => createPost({ variables: { ...values } }),
    initialState: { body: '' },
  })

  return (
    <div className="PostForm">
      <h2>Create a post</h2>

      <Form onSubmit={handleFormSubmit}>
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
    </div>
  )
}

export default PostForm
