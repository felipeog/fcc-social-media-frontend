import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

import { LS_TOKEN_KEY } from '../../consts'

const UserContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
})

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }

    default:
      return state
  }
}

const getInitialState = () => {
  if (localStorage.getItem(LS_TOKEN_KEY)) {
    const decodedToken = jwtDecode(localStorage.getItem(LS_TOKEN_KEY))

    if (decodedToken.exp * 1_000 < Date.now()) {
      localStorage.removeItem(LS_TOKEN_KEY)

      return {
        user: null,
      }
    } else {
      return {
        user: decodedToken,
      }
    }
  } else {
    return {
      user: null,
    }
  }
}

const UserProvider = (props) => {
  const initialState = getInitialState()
  const [state, dispatch] = useReducer(userReducer, initialState)

  const login = (userData) => {
    localStorage.setItem(LS_TOKEN_KEY, userData.token)

    dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }

  const logout = () => {
    localStorage.removeItem(LS_TOKEN_KEY)

    dispatch({
      type: 'LOGOUT',
    })
  }

  return (
    <UserContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  )
}

export { UserContext, UserProvider }
