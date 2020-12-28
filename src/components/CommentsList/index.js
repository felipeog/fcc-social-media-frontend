import React from 'react'
import { Grid, Transition } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'

import CommentCard from '../CommentCard'
import CommentForm from '../CommentForm'
import UserStore from '../../stores/UserStore'
import './index.scss'

const CommentsList = ({ title, post: { id, comments } }) => {
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
      {UserStore.isLoggedIn && <CommentForm postId={id} />}

      {title && <h1>{title}</h1>}
      {renderComments()}
    </div>
  )
}

export default observer(CommentsList)
