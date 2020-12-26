import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { UserContext } from '../../context/User'

import { LIKE_MUTATION } from './query'
import './index.scss'

const LikePostButton = ({ post: { id, likes, likeCount } }) => {
  // state
  const [liked, setLiked] = useState(false)

  // hooks
  const history = useHistory()

  // context
  const { user } = useContext(UserContext)

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
  return (
    <div className="LikePostButton" onClick={handleLike}>
      <span className="label">foda</span>
      <span className="count">{likeCount}</span>
    </div>
  )
}

export default LikePostButton
