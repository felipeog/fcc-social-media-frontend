import React from 'react'
import { Message } from 'semantic-ui-react'

import './index.scss'

const FormErrorsList = ({ errors }) => {
  // rendering
  const hasErrors = Object.keys(errors || {}).length > 0
  if (hasErrors)
    return (
      <div className="FormErrorsList">
        <Message error list={Object.values(errors)} />
      </div>
    )

  return null
}

export default FormErrorsList
