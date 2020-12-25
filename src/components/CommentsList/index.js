import React from 'react'
import { Grid, Transition } from 'semantic-ui-react'

import CommentCard from '../CommentCard'

const CommentsList = ({ postId, comments }) => {
  return (
    <Grid className="CommentsList" columns={1}>
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

export default CommentsList
