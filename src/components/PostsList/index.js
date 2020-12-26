import React from 'react'

import PostCard from '../PostCard'
import './index.scss'

const PostsList = ({ title, posts }) => {
  // rendering
  if (!posts?.length) return <h1>nenhum fof encontrado</h1>

  return (
    <div className="PostsList">
      {title && <h1 className="title">{title}</h1>}

      <div className="list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostsList
