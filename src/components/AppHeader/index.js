import React, { useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import FofLogo from '../../assets/fof-logo.svg'
import { UserContext } from '../../context/User'
import './index.scss'

const AppHeader = () => {
  // context
  const { user, logout } = useContext(UserContext)

  // rendering
  const renderRightSide = () => {
    if (user) {
      return (
        <>
          <div className="header-link" onClick={logout}>
            sair
          </div>
        </>
      )
    } else {
      return (
        <>
          <NavLink className="header-link" to="/login">
            entrar
          </NavLink>
          <NavLink className="header-link" to="/register">
            registrar-se
          </NavLink>
        </>
      )
    }
  }

  return (
    <div className="AppHeader">
      <NavLink className="home-link" to="/home">
        <img className="logo" src={FofLogo} alt="" />
      </NavLink>

      <div className="right">{renderRightSide()}</div>
    </div>
  )
}

export default AppHeader
