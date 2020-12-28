import React, { useState } from 'react'
import { Icon, Button, Confirm, Popup } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { observer } from 'mobx-react-lite'

import UserStore from '../../stores/UserStore'
import { DELETE_COMMENT_MUTATION } from './query'
import './index.scss'

const DeleteCommentButton = ({ postId, comment, callback }) => {
  // state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // context
  const user = UserStore.getUser

  // mutations
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
  const renderComponent = () => {
    const ButtonComponent = (
      <div className="DeleteCommentButton">
        <Button
          basic
          as="div"
          color="red"
          loading={loading}
          onClick={toggleConfirm}
        >
          <Icon name="trash" />
        </Button>
        <Confirm
          open={isConfirmOpen}
          onCancel={toggleConfirm}
          onConfirm={handleDelete}
        />
      </div>
    )

    return <Popup content="Delete this comment" trigger={ButtonComponent} />
  }

  if (user && user.username === comment.username) {
    return renderComponent()
  }

  return null
}

export default observer(DeleteCommentButton)
