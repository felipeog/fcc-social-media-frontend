import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import UserStore from '../../stores/UserStore'

const AppHeader = () => {
  // context
  const user = UserStore.getUser

  // rendering
  const renderLeftSide = () => {
    if (UserStore.isLoggedIn) {
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
    if (UserStore.isLoggedIn) {
      return (
        <>
          <Menu.Item name="logout" onClick={UserStore.logout} />
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

export default observer(AppHeader)
