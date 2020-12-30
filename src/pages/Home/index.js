import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Loader } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'

import PostsList from '../../components/PostsList'
import PostForm from '../../components/PostForm'
import UserStore from '../../stores/UserStore'

import { POSTS_QUERY, CREATE_POST_MUTATION } from './query'

const Home = ({ location }) => {
  // queries
  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore: postsFetchMore,
    refetch: postsRefetch,
  } = useQuery(POSTS_QUERY, {
    onError: (err) => console.error('Home @ useQuery >>>>>', err),
  })

  // mutations
  const [
    createPost,
    { loading: createPostLoading, error: createPostError },
  ] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => postsRefetch({ page: 1 }),
    onError: (err) => {
      console.error('Home @ createPost >>>>>', err)
      setErrors(err.graphQLErrors[0]?.extensions?.errors || {})
    },
  })

  // effects
  useEffect(() => {
    if (location.state?.refetch) {
      postsRefetch({ page: 1 })
    }
  }, [location])

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

  const onPostDelete = () => {
    postsRefetch()
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
          onPostDelete={onPostDelete}
        />
      </>
    )
  }

  return <div className="Home">{renderPage()}</div>
}

export default observer(Home)
