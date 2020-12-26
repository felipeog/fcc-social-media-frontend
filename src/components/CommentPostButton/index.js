import React, { useContext } from 'react'
import { Icon, Label, Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../context/User'

const CommentPostButton = ({ post: { id, commentCount } }) => {
  // context
  const { user } = useContext(UserContext)

  // rendering
  const renderComponent = () => {
    const popupContent = user
      ? 'Comment this post'
      : 'You must be logged in to comment a post'
    const ButtonComponent = (
      <Button labelPosition="right" as={Link} to={`/post/${id}`}>
        <Button basic color="blue">
          <Icon name="comments" />
        </Button>

        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    )

    return <Popup content={popupContent} trigger={ButtonComponent} />
  }

  return <div className="LikePostButton">{renderComponent()}</div>
}

export default CommentPostButton
