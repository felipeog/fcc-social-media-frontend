import React from 'react'
import { Loader } from 'semantic-ui-react'

import './index.scss'

const ReCAPTCHAWrapper = ({ children }) => {
  return (
    <div className="ReCAPTCHAWrapper">
      {children}

      <div className="loader-wrapper">
        <Loader active inline />
      </div>
    </div>
  )
}

export default ReCAPTCHAWrapper
