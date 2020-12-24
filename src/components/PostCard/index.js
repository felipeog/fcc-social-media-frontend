import React from 'react'
import { Card, Icon, Label, Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import { useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

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
  // const [likePost, { loading }] = useMutation(LIKE_MUTATION, {
  //   variables: {
  //     postId: id,
  //   },
  //   onError: (err) => console.error('PostCard @ likePost >>>>>', err),
  // })

  const likePost = () => console.log('like')
  const commentPost = () => console.log('comment')

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

          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>

        <Button as="div" labelPosition="right" onClick={commentPost}>
          <Button basic color="blue">
            <Icon name="comments" />
          </Button>

          <Label as="a" basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  )
}

export default PostCard
