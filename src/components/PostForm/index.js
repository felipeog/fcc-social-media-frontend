import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../../hooks/useForm'
import FormErrorsList from '../FormErrorsList'
import { CREATE_POST_MUTATION, POSTS_QUERY } from './query'
import './index.scss'

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
