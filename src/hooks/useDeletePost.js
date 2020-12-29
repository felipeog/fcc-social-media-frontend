import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'

import { REFRESH_PAGE_MESSAGE } from '../consts'

const DELETE_POST_MUTATION = gql`
  mutation home_deletePostMutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const useDeletePost = ({ onDelete, onError }) => {
  // mutations
  const [deletePostMutation, { loading, error }] = useMutation(
    DELETE_POST_MUTATION,
    {
      onCompleted: onDelete,
      onError: () => {
        toast(REFRESH_PAGE_MESSAGE)
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
