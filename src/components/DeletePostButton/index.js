import React, { useState } from 'react'
import { Icon, Button, Confirm, Popup } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'

import { useDeletePost } from '../../hooks/useDeletePost'
import UserStore from '../../stores/UserStore'
import './index.scss'

const DeletePostButton = ({ post, onPostDelete }) => {
  // state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // context
  const user = UserStore.getUser

  // hooks
  const { deletePost, loading } = useDeletePost({
    onDelete: () => {
      toggleConfirm()
      onPostDelete?.()
    },
    onError: (err) => console.error('DeletePostButton @ deletePost >>>>>', err),
  })

  // functions
  const toggleConfirm = () => {
    setIsConfirmOpen((isOpen) => !isOpen)
  }

  const handleDelete = () => {
    deletePost(post.id)
  }

  // rendering
  const renderComponent = () => {
    const ButtonComponent = (
      <div className="DeletePostButton">
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

    return <Popup content="Delete this post" trigger={ButtonComponent} />
  }

  if (user && user.username === post.username) {
    return renderComponent()
  }

  return null
}

export default observer(DeletePostButton)
