import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Error404 from './pages/Error404'

const Router = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      <Route path="*" component={Error404} />
    </Switch>
  )
}

export default Router
