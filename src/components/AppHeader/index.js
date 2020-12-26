import React, { useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import { UserContext } from '../../context/User'

const AppHeader = () => {
  // context
  const { user, logout } = useContext(UserContext)

  // rendering
  const renderLeftSide = () => {
    if (user) {
      return (
        <Menu.Item
          name={user.username}
          isActive={() => true}
          as={NavLink}
          to="/home"
        />
      )
    } else {
      return <Menu.Item name="home" as={NavLink} to="/home" />
    }
  }

  const renderRightSide = () => {
    if (user) {
      return (
        <>
          <Menu.Item name="logout" onClick={logout} />
        </>
      )
    } else {
      return (
        <>
          <Menu.Item name="login" as={NavLink} to="/login" />
          <Menu.Item name="register" as={NavLink} to="/register" />
        </>
      )
    }
  }

  return (
    <Menu pointing secondary>
      {renderLeftSide()}

      <Menu.Menu position="right">{renderRightSide()}</Menu.Menu>
    </Menu>
  )
}

export default AppHeader
