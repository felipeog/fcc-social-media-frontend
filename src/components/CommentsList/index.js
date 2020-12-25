import React, { useContext } from 'react'
import { Grid, Transition } from 'semantic-ui-react'

import CommentCard from '../CommentCard'
import CommentForm from '../CommentForm'
import { UserContext } from '../../context/User'

const CommentsList = ({ postId, comments }) => {
  // context
  const { user } = useContext(UserContext)

  // rendering
  const renderComments = () => {
    if (!comments?.length) return <h1>No comments found</h1>

    return (
      <Grid columns={1}>
        <Grid.Row>
          <Transition.Group>
            {comments.map((comment) => (
              <Grid.Column key={comment.id}>
                <CommentCard postId={postId} comment={comment} />
              </Grid.Column>
            ))}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    )
  }

  return (
    <div className="CommentsList">
      {user && <CommentForm postId={postId} />}

      {renderComments()}
    </div>
  )
}

export default CommentsList
