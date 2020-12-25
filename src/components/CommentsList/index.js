import React, { useContext } from 'react'
import { Grid, Transition } from 'semantic-ui-react'

import CommentCard from '../CommentCard'
import CommentForm from '../CommentForm'
import { UserContext } from '../../context/User'

const CommentsList = ({ postId, comments }) => {
  // hooks
  const { user } = useContext(UserContext)

  // rendering
  return (
    <div className="CommentsList">
      {user && <CommentForm postId={postId} />}

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
    </div>
  )
}

export default CommentsList
