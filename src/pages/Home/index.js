import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Loader } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'

import PostsList from '../../components/PostsList'
import PostForm from '../../components/PostForm'
import UserStore from '../../stores/UserStore'

import { POSTS_QUERY, CREATE_POST_MUTATION } from './query'

const Home = () => {
  // queries
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore: postsFetchMore,
  } = useQuery(POSTS_QUERY, {
    variables: {
      page: 1,
    },
    onError: (err) => console.error('Home @ useQuery >>>>>', err),
  })

  // mutations
  const [
    createPost,
    { loading: createPostLoading, error: createPostError },
  ] = useMutation(CREATE_POST_MUTATION, {
    update: (cache, { data }) => {
      const newPost = data?.createPost
      const prevData = cache.readQuery({
        query: POSTS_QUERY,
      })

      if (newPost && prevData) {
        const newData = {
          getPosts: {
            ...prevData?.getPosts,
            posts: [newPost, ...prevData?.getPosts?.posts],
          },
        }

        cache.writeQuery({
          query: POSTS_QUERY,
          data: newData,
        })
      }
    },
    onError: (err) => console.error('Home @ createPost >>>>>', err),
  })

  // functions
  const loadMore = () => {
    const nextPage = postsData?.getPosts?.nextPage
    if (postsLoading || nextPage === null) return

    postsFetchMore({
      variables: {
        page: nextPage,
      },
    }).catch((err) => console.error('Home @ loadMore >>>>>', err))
  }

  // rendering
  const renderPage = () => {
    if (postsLoading) return <Loader active />
    if (postsError) return <h1>An error occurred</h1>

    const posts = postsData?.getPosts?.posts
    const hasNextPage = postsData?.getPosts?.hasNextPage

    return (
      <>
        {UserStore.isLoggedIn && (
          <PostForm
            createPost={createPost}
            loading={createPostLoading}
            error={createPostError}
          />
        )}

        <PostsList
          title="Recent posts"
          posts={posts}
          pagination={{ loadMore, hasNextPage }}
        />
      </>
    )
  }

  return <div className="Home">{renderPage()}</div>
}

export default observer(Home)
