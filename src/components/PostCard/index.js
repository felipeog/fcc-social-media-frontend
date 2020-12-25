import React from 'react'
import { Card, Icon, Label, Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import LikePostButton from '../LikePostButton'
import DeletePostButton from '../DeletePostButton'

dayjs.extend(relativeTime)

const PostCard = ({
  post: {
    body,
    commentCount,
    comments,
    createdAt,
    id,
    likeCount,
    likes,
    username,
  },
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

      <Card.Content extra>
        <LikePostButton post={{ id, likes, likeCount }} />

        <Button labelPosition="right" as={Link} to={`/post/${id}`}>
          <Button basic color="blue">
            <Icon name="comments" />
          </Button>

          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>

        <DeletePostButton post={{ id, username }} />
      </Card.Content>
    </Card>
  )
}

export default PostCard
