import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

import LikePostButton from '../LikePostButton'
import DeletePostButton from '../DeletePostButton'
import './index.scss'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

const PostCard = ({
  post: { body, commentCount, createdAt, id, likeCount, likes, username },
}) => {
  // rendering
  return (
    <div className="PostCard">
      <div className="content">
        <p className="username">{username}</p>

        <p className="date">{dayjs(createdAt).fromNow(true)}</p>

        <Link className="body" to={`/post/${id}`}>
          {body}
        </Link>
      </div>

      <div className="actions">
        <div className="reactions">
          <LikePostButton post={{ id, likes, likeCount }} />
          <LikePostButton post={{ id, likes, likeCount }} />
        </div>

        {/* <Button labelPosition="right" as={Link} to={`/post/${id}`}>
          <Button basic color="blue">
            <Icon name="comments" />
          </Button>

          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button> */}

        <DeletePostButton post={{ id, username }} />
      </div>
    </div>
  )
}

export default PostCard
