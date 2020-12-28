import React from 'react'
import { useQuery } from '@apollo/client'
import { Loader } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'

import PostsList from '../../components/PostsList'
import PostForm from '../../components/PostForm'
import UserStore from '../../stores/UserStore'
import { POSTS_QUERY } from './query'

const Home = () => {
  // queries
  const { data, loading, error } = useQuery(POSTS_QUERY, {
    onError: (err) => console.error('Home @ useQuery >>>>>', err),
  })

  // rendering
  const renderPage = () => {
    if (loading) return <Loader active />
    if (error) return <h1>An error occurred</h1>

    const posts = data?.getPosts

    return (
      <>
        {UserStore.isLoggedIn && <PostForm />}

        <PostsList title="Recent posts" posts={posts} />
      </>
    )
  }

  return <div className="Home">{renderPage()}</div>
}

export default observer(Home)
