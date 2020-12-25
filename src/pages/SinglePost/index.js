import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Loader, Grid, Card, Button, Icon, Label } from 'semantic-ui-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import LikePostButton from '../../components/LikePostButton'
import DeletePostButton from '../../components/DeletePostButton'
import { POST_QUERY } from './query'

dayjs.extend(relativeTime)

const SinglePost = ({
  history,
  match: {
    params: { postId },
  },
}) => {
  // hooks
  const { data, loading, error } = useQuery(POST_QUERY, {
    variables: {
      postId,
    },
    onError: (err) => console.error('SinglePost @ useQuery >>>>>', err),
  })

  // functions
  const onDeleteCallback = () => {
    history.push('/')
  }

  // rendering
  const renderPage = () => {
    if (loading) return <Loader active />
    if (error) return <h1>An error occurred</h1>

    const post = data?.getPost
    if (!post) return <h1>No post found</h1>

    const {
      body,
      commentCount,
      createdAt,
      id,
      likeCount,
      username,
      likes,
      comments,
    } = post

    return (
      <Grid>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{dayjs(createdAt).fromNow(true)}</Card.Meta>
              <Card.Description>{body}</Card.Description>
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

              <DeletePostButton
                post={{ id, username }}
                callback={onDeleteCallback}
              />
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid>
    )
  }

  return <div className="SinglePost">{renderPage()}</div>
}

export default SinglePost
