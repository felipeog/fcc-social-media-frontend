import React from 'react'
import { Icon, Label, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const CommentPostButton = ({ post: { id, commentCount } }) => {
  // rendering
  return (
    <div className="LikePostButton">
      <Button labelPosition="right" as={Link} to={`/post/${id}`}>
        <Button basic color="blue">
          <Icon name="comments" />
        </Button>

        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    </div>
  )
}

export default CommentPostButton
