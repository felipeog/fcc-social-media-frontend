import React, { useState, useContext } from 'react'
import { Icon, Button, Confirm, Popup } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { UserContext } from '../../context/User'
import { DELETE_POST_MUTATION, POSTS_QUERY } from './query'
import './index.scss'

const DeletePostButton = ({ post, callback }) => {
  // state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // context
  const { user } = useContext(UserContext)

  // mutations
  const [deletePost, { loading }] = useMutation(DELETE_POST_MUTATION, {
    update: (proxy) => {
      const data = proxy.readQuery({ query: POSTS_QUERY })
      if (data) {
        const { getPosts: prevPosts } = data
        const updatedPosts = prevPosts.filter(
          (prevPost) => prevPost.id !== post.id
        )
        const newData = { getPosts: updatedPosts }

        proxy.writeQuery({ query: POSTS_QUERY, data: newData })
      }

      toggleConfirm()
      if (callback && typeof callback === 'function') callback()
    },
    onError: (err) => console.error('DeletePostButton @ deletePost >>>>>', err),
  })

  // functions
  const handleDelete = () => {
    deletePost({ variables: { postId: post.id } })
  }

  const toggleConfirm = () => {
    setIsConfirmOpen((isOpen) => !isOpen)
  }

  // rendering
  const renderComponent = () => {
    const ButtonComponent = (
      <div className="DeletePostButton">
        <Button as="div" color="red" loading={loading} onClick={toggleConfirm}>
          <Icon name="trash" />
        </Button>
        <Confirm
          open={isConfirmOpen}
          onCancel={toggleConfirm}
          onConfirm={handleDelete}
        />
      </div>
    )

    return <Popup content="Delete this post" trigger={ButtonComponent} />
  }

  if (user && user.username === post.username) {
    return renderComponent()
  }

  return null
}

export default DeletePostButton
