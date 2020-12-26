import React from 'react'
import { Card, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import LikePostButton from '../LikePostButton'
import CommentPostButton from '../CommentPostButton'
import DeletePostButton from '../DeletePostButton'
import './index.scss'

dayjs.extend(relativeTime)

const PostCard = ({
  post: { body, commentCount, createdAt, id, likeCount, likes, username },
}) => {
  // rendering
  return (
    <Card className="PostCard" fluid>
      <Card.Content>
        <Card.Header>{username}</Card.Header>

        <Popup
          content={dayjs(createdAt).format('MMMM D, YYYY - HH:mm')}
          trigger={<Card.Meta>{dayjs(createdAt).fromNow(true)}</Card.Meta>}
        />

        <Card.Description as={Link} to={`/post/${id}`}>
          {body}
        </Card.Description>
      </Card.Content>

      <Card.Content className="actions" extra>
        <div className="actions-left">
          <LikePostButton post={{ id, likes, likeCount }} />
          <CommentPostButton post={{ id, commentCount }} />
        </div>

        <DeletePostButton post={{ id, username }} />
      </Card.Content>
    </Card>
  )
}

export default PostCard
