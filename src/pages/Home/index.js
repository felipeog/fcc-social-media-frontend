import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Loader } from 'semantic-ui-react'

import PostsList from '../../components/PostsList'
import PostForm from '../../components/PostForm'
import { UserContext } from '../../context/User'
import { POSTS_QUERY } from './query'

const Home = () => {
  // context
  const { user } = useContext(UserContext)

  // queries
  const { data, loading, error } = useQuery(POSTS_QUERY, {
    onError: (err) => console.error('Home @ useQuery >>>>>', err),
  })

  // rendering
  const renderPage = () => {
    if (loading) return <Loader active />
    if (error) return <h1>ocorreu um erro</h1>

    const posts = data?.getPosts

    return (
      <>
        {user && <PostForm />}
        <PostsList title="fofs recentes" posts={posts} />
      </>
    )
  }

  return <div className="Home">{renderPage()}</div>
}

export default Home
