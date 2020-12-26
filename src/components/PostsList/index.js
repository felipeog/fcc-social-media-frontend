import React from 'react'
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from '../PostCard'

const PostsList = ({ title, posts }) => {
  // rendering
  const renderPosts = () => {
    if (!posts?.length) return <h1>No posts found</h1>

    return (
      <Grid className="PostsList" columns={3}>
        <Grid.Row>
          <Transition.Group>
            {posts.map((post) => (
              <Grid.Column key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    )
  }

  return (
    <div className="PostsList">
      {title && <h1>{title}</h1>}

      {renderPosts()}
    </div>
  )
}

export default PostsList
