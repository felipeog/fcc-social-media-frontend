import React from 'react'
import { useQuery } from '@apollo/client'
import { Loader } from 'semantic-ui-react'

import PostsList from '../../components/PostsList'
import { POSTS_QUERY } from './query'

const Home = () => {
  const { data, loading, error } = useQuery(POSTS_QUERY, {
    onError: (err) => console.error('Home @ useQuery >>>>>', err),
  })

  const renderPage = () => {
    if (loading) return <Loader active />
    if (error) return <h1>An error occurred</h1>

    const posts = data?.getPosts
    if (!posts?.length) return <h1>No posts found</h1>

    return (
      <>
        <h1>Recents posts</h1>
        <PostsList posts={posts} />
      </>
    )
  }

  return <div className="Home">{renderPage()}</div>
}

export default Home
