import React, { useContext } from 'react'
import { Card, Icon, Label, Button, Popup } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import LikeButton from '../LikeButton'
import DeleteButton from '../DeleteButton'
import { UserContext } from '../../context/User'

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
  // hooks
  const { user } = useContext(UserContext)
  const history = useHistory()

  // functions
  const onDeleteCallback = () => {
    history.push('/')
  }

  // rendering
  const renderDeleteButton = () => {
    if (user && user?.username === username) {
      return <DeleteButton postId={id} callback={onDeleteCallback} />
    }
  }

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
        <LikeButton post={{ id, likes, likeCount }} />

        <Button as="div" labelPosition="right" as={Link} to={`/post/${id}`}>
          <Button basic color="blue">
            <Icon name="comments" />
          </Button>

          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>

        {renderDeleteButton()}
      </Card.Content>
    </Card>
  )
}

export default PostCard
