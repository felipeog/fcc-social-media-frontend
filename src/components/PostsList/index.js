import React from 'react'
import { Grid, Transition, Button } from 'semantic-ui-react'

import PostCard from '../PostCard'
import './index.scss'

const PostsList = ({ title, posts, pagination, onPostDelete }) => {
  // rendering
  const renderPosts = () => {
    if (!posts?.length) return <h2>No posts found</h2>

    return (
      <Grid columns={2} stackable>
        <Grid.Row>
          <Transition.Group>
            {posts.map((post) => (
              <Grid.Column className="post-wrapper" stretched key={post.id}>
                <PostCard post={post} onPostDelete={onPostDelete} />
              </Grid.Column>
            ))}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    )
  }

  const renderPagination = () => {
    if (!posts?.length || !pagination?.hasNextPage || !pagination?.loadMore)
      return

    return (
      <Button primary onClick={pagination.loadMore}>
        Load more
      </Button>
    )
  }

  return (
    <div className="PostsList">
      {title && <h1>{title}</h1>}

      {renderPosts()}
      {renderPagination()}
    </div>
  )
}

export default PostsList
