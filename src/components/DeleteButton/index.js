import React, { useState } from 'react'
import { Icon, Button, Confirm } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { DELETE_POST_MUTATION, POSTS_QUERY } from './query'

const DeleteButton = ({ postId, callback }) => {
  // state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // hooks
  const [deletePost, { loading }] = useMutation(DELETE_POST_MUTATION, {
    update: (proxy, result) => {
      const { getPosts: prevPosts } = proxy.readQuery({ query: POSTS_QUERY })
      const updatedPosts = prevPosts.filter((post) => post.id !== postId)
      const newData = { getPosts: updatedPosts }

      proxy.writeQuery({ query: POSTS_QUERY, data: newData })

      toggleConfirm()
      if (callback && typeof callback === 'function') callback()
    },
    onError: (err) => console.error('DeleteButton @ deletePost >>>>>', err),
  })

  // functions
  const handleDelete = () => {
    deletePost({ variables: { postId } })
  }
  const toggleConfirm = () => {
    setIsConfirmOpen((isOpen) => !isOpen)
  }

  // rendering
  return (
    <div className="DeleteButton">
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
}

export default DeleteButton
