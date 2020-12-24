import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { UserContext } from './context/User'

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext)

  const render = (props) => {
    if (user) {
      return <Redirect to="/" />
    } else {
      return <Component {...props} />
    }
  }

  return <Route {...rest} render={render} />
}

export default AuthRoute
