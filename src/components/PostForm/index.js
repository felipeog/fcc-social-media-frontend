import React, { useState } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../../hooks/useForm'
import FormErrorsList from '../FormErrorsList'
import { CREATE_POST_MUTATION, POSTS_QUERY } from './query'

const PostForm = () => {
  // state
  const [errors, setErrors] = useState({})

  // mutations
  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION, {
    update: (proxy, result) => {
      const { getPosts: prevPosts } = proxy.readQuery({ query: POSTS_QUERY })
      const newPost = result.data.createPost
      const updatedPosts = [newPost, ...prevPosts]
      const newData = { getPosts: updatedPosts }

      proxy.writeQuery({ query: POSTS_QUERY, data: newData })

      resetForm()
      setErrors({})
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions?.errors || {})
    },
  })

  // hooks
  const { values, handleFormSubmit, handleInputChange, resetForm } = useForm({
    callback: () => createPost({ variables: { ...values } }),
    initialState: { body: '' },
  })

  // rendering
  return (
    <div className="PostForm">
      <h2>Create a post</h2>

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

      <FormErrorsList errors={errors} />
    </div>
  )
}

export default PostForm
