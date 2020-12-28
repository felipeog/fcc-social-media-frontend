import React from 'react'
import { Icon, Label, Button, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import UserStore from '../../stores/UserStore'

const CommentPostButton = ({ post: { id, commentCount } }) => {
  // rendering
  const renderComponent = () => {
    const popupContent = UserStore.isLoggedIn
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

  return <div className="CommentPostButton">{renderComponent()}</div>
}

export default observer(CommentPostButton)
