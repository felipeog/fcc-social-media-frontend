import React from 'react'
import { Grid } from 'semantic-ui-react'

import PostCard from '../PostCard'

const PostsList = ({ posts }) => {
  return (
    <Grid className="PostsList" columns={3}>
      <Grid.Row>
        {posts.map((post) => (
          <Grid.Column key={post.id}>
            <PostCard post={post} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  )
}

export default PostsList
