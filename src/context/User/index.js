import React, { createContext, useReducer } from 'react'

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

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, { user: null })

  const login = (userData) => {
    console.log(userData)
    dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }

  const logout = () => {
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
