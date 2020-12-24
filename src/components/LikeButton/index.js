import React, { useContext, useEffect, useState } from 'react'
import { Icon, Label, Button, Popup } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { UserContext } from '../../context/User'

import { LIKE_MUTATION } from './query'

const LikeButton = ({ post: { id, likes, likeCount } }) => {
  // state
  const [liked, setLiked] = useState(false)

  // hooks
  const history = useHistory()
  const { user } = useContext(UserContext)
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
    if (user) {
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

    if (user) {
      return ButtonComponent
    } else {
      return (
        <Popup
          content="You must be logged in to like a post"
          trigger={ButtonComponent}
        />
      )
    }
  }

  return <div className="LikeButton">{renderComponent()}</div>
}

export default LikeButton
