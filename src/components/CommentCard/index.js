import React from 'react'
import { Card, Popup } from 'semantic-ui-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import DeleteCommentButton from '../DeleteCommentButton'
import './index.scss'

dayjs.extend(relativeTime)

const CommentCard = ({
  postId,
  comment: { body, createdAt, id, username },
}) => {
  // rendering
  return (
    <Card className="CommentCard" fluid>
      <Card.Content>
        <Card.Header>{username}</Card.Header>

        <Popup
          content={dayjs(createdAt).format('MMMM D, YYYY - HH:mm')}
          trigger={<Card.Meta>{dayjs(createdAt).fromNow(true)}</Card.Meta>}
        />

        <Card.Description>{body}</Card.Description>

        <DeleteCommentButton postId={postId} comment={{ id, username }} />
      </Card.Content>
    </Card>
  )
}

export default CommentCard
