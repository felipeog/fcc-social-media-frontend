import React, { useEffect, useState } from 'react'
import { Icon, Label, Button, Popup } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { observer } from 'mobx-react-lite'

import UserStore from '../../stores/UserStore'
import { LIKE_MUTATION } from './query'

const LikePostButton = ({ post: { id, likes, likeCount } }) => {
  // state
  const [liked, setLiked] = useState(false)

  // hooks
  const history = useHistory()

  // context
  const user = UserStore.getUser

  // mutations
  const [likePost, { loading }] = useMutation(LIKE_MUTATION, {
    onError: (err) => console.error('PostCard @ likePost >>>>>', err),
  })

  // effects
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, likes])

  // functions
  const handleLike = () => {
    if (UserStore.isLoggedIn) {
      likePost({
        variables: {
          postId: id,
        },
      })
    } else {
      history.push('/login')
    }
  }

  // rendering
  const renderComponent = () => {
    const popupContent = UserStore.isLoggedIn
      ? liked
        ? 'Remove like'
        : 'Like this post'
      : 'You must be logged in to like a post'
    const ButtonComponent = (
      <Button
        as="div"
        labelPosition="right"
        onClick={handleLike}
        loading={loading}
      >
        <Button basic={!liked} color="teal">
          <Icon name="heart" />
        </Button>

        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    )

    return <Popup content={popupContent} trigger={ButtonComponent} />
  }

  return <div className="LikePostButton">{renderComponent()}</div>
}

export default observer(LikePostButton)
