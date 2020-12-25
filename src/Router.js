import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Home from './pages/Home'
import SinglePost from './pages/SinglePost'
import Login from './pages/Login'
import Register from './pages/Register'
import Error404 from './pages/Error404'
import AuthRoute from './AuthRoute'

const Router = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/post/:postId" component={SinglePost} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />

      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      <Route path="*" component={Error404} />
    </Switch>
  )
}

export default Router
