import React, { useContext } from 'react'
import { Grid, Transition } from 'semantic-ui-react'

import CommentCard from '../CommentCard'
import CommentForm from '../CommentForm'
import { UserContext } from '../../context/User'
import './index.scss'

const CommentsList = ({ title, post: { id, comments } }) => {
  // context
  const { user } = useContext(UserContext)

  // rendering
  const renderComments = () => {
    if (!comments?.length) return <h2>No comments found</h2>

    return (
      <Grid columns={1}>
        <Grid.Row>
          <Transition.Group>
            {comments.map((comment) => (
              <Grid.Column className="comment-wrapper" key={comment.id}>
                <CommentCard post={{ id, comment }} />
              </Grid.Column>
            ))}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    )
  }

  return (
    <div className="CommentsList">
      {user && <CommentForm postId={id} />}

      {title && <h1>{title}</h1>}
      {renderComments()}
    </div>
  )
}

export default CommentsList
