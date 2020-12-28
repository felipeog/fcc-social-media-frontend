import React from 'react'
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from '../PostCard'
import './index.scss'

const PostsList = ({ title, posts }) => {
  // rendering
  const renderPosts = () => {
    if (!posts?.length) return <h2>No posts found</h2>

    return (
      <Grid columns={3}>
        <Grid.Row>
          <Transition.Group>
            {posts.map((post) => (
              <Grid.Column className="post-wrapper" key={post.id}>
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
