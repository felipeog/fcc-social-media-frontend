import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const AppHeader = () => {
  return (
    <Menu pointing secondary>
      <Menu.Item name="home" as={NavLink} to="/home" />

      <Menu.Menu position="right">
        <Menu.Item name="login" as={NavLink} to="/login" />
        <Menu.Item name="register" as={NavLink} to="/register" />
      </Menu.Menu>
    </Menu>
  )
}

export default AppHeader
