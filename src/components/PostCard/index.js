import React, { useContext } from 'react'
import { Card, Icon, Label, Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import { useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { UserContext } from '../../context/User'
// import { LIKE_MUTATION } from './query'

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
  const { user } = useContext(UserContext)
  // const [likePost, { loading }] = useMutation(LIKE_MUTATION, {
  //   variables: {
  //     postId: id,
  //   },
  //   onError: (err) => console.error('PostCard @ likePost >>>>>', err),
  // })

  const likePost = () => console.log('like')
  const commentPost = () => console.log('comment')

  // rendering
  const renderDeleteButton = () => {
    if (user && user?.username === username) {
      return (
        <Button as="div" color="red">
          <Icon name="trash" />
        </Button>
      )
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
        <Button
          as="div"
          labelPosition="right"
          onClick={likePost}
          // loading={loading}
        >
          <Button basic color="teal">
            <Icon name="heart" />
          </Button>

          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>

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
