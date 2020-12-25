import React, { useState, useContext } from 'react'
import { Icon, Button, Confirm } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { UserContext } from '../../context/User'
import { DELETE_COMMENT_MUTATION, POST_QUERY } from './query'

const DeleteCommentButton = ({ postId, comment }) => {
  // state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // hooks
  const { user } = useContext(UserContext)
  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT_MUTATION, {
    onCompleted: () => {
      toggleConfirm()
      if (callback && typeof callback === 'function') callback()
    },
    onError: (err) =>
      console.error('DeleteCommentButton @ deleteComment >>>>>', err),
  })

  // functions
  const handleDelete = () => {
    deleteComment({ variables: { postId, commentId: comment.id } })
  }
  const toggleConfirm = () => {
    setIsConfirmOpen((isOpen) => !isOpen)
  }

  // rendering
  if (user && user.username === comment.username) {
    return (
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
  }

  return null
}

export default DeleteCommentButton
