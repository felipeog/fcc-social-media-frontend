import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'

import { REFRESH_PAGE_MESSAGE } from '../consts'

const DELETE_POST_MUTATION = gql`
  mutation useDeletePost_deletePostMutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const POSTS_QUERY = gql`
  query useDeletePost_postsQuery($page: Int, $limit: Int) {
    getPosts(page: $page, limit: $limit) {
      posts {
        body
        commentCount
        createdAt
        id
        likeCount
        username

        likes {
          createdAt
          id
          username
        }

        comments {
          body
          createdAt
          id
          username
        }
      }

      totalCount
      hasNextPage
      nextPage
    }
  }
`

export const useDeletePost = ({ onDelete, onError }) => {
  // mutations
  const [deletePostMutation, { loading, error }] = useMutation(
    DELETE_POST_MUTATION,
    {
      update: (cache, { data }) => {
        const deletedPostId = data?.deletePost
        const prevData = cache.readQuery({
          query: POSTS_QUERY,
        })

        if (deletedPostId && prevData) {
          const newPosts = prevData?.getPosts?.posts?.filter((post) => {
            return post?.id !== deletedPostId
          })
          const newData = {
            getPosts: {
              ...prevData?.getPosts,
              posts: newPosts,
            },
          }

          cache.writeQuery({
            query: POSTS_QUERY,
            data: newData,
          })
        }
      },
      onCompleted: () => {
        onDelete?.()
      },
      onError: () => {
        toast('Error deleting post.', REFRESH_PAGE_MESSAGE)
        onError?.()
      },
    }
  )

  // functions
  const deletePost = (postId) => {
    deletePostMutation({ variables: { postId } })
  }

  return {
    deletePost,
    loading,
    error,
  }
}
