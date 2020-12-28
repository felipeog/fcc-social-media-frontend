import React, { useState } from 'react'
import { Icon, Button, Confirm, Popup } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'

import UserStore from '../../stores/UserStore'
import { DELETE_POST_MUTATION, POSTS_QUERY } from './query'
import { REFRESH_PAGE_MESSAGE } from '../../consts'
import './index.scss'

const DeletePostButton = ({ post, callback }) => {
  // state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // context
  const user = UserStore.getUser

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
    onError: (err) => {
      toast('Error deleting post.', REFRESH_PAGE_MESSAGE)
      console.error('DeletePostButton @ deletePost >>>>>', err)
    },
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
