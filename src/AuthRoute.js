import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import UserStore from './stores/UserStore'

const AuthRoute = ({ component: Component, ...rest }) => {
  const render = (props) => {
    if (UserStore.isLoggedIn) {
      return <Redirect to="/" />
    } else {
      return <Component {...props} />
    }
  }

  return <Route {...rest} render={render} />
}

export default observer(AuthRoute)
