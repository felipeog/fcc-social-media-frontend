import React from 'react'
import { useQuery } from '@apollo/client'
import { Loader } from 'semantic-ui-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import CommentsList from '../../components/CommentsList'
import PostCard from '../../components/PostCard'
import { POST_QUERY } from './query'
import './index.scss'

dayjs.extend(relativeTime)

const SinglePost = ({
  history,
  match: {
    params: { postId },
  },
}) => {
  // queries
  const { data, loading, error } = useQuery(POST_QUERY, {
    variables: {
      postId,
    },
    onError: (err) => console.error('SinglePost @ useQuery >>>>>', err),
  })

  // functions
  const onPostDelete = () => {
    history.push('/')
  }

  // rendering
  const renderPage = () => {
    if (loading) return <Loader active />
    if (error) return <h1>An error occurred</h1>

    const post = data?.getPost
    if (!post) return <h1>No post found</h1>

    const { id, comments } = post

    return (
      <>
        <PostCard post={post} onPostDelete={onPostDelete} />
        <CommentsList title="Comments" post={{ id, comments }} />
      </>
    )
  }

  return <div className="SinglePost">{renderPage()}</div>
}

export default SinglePost
