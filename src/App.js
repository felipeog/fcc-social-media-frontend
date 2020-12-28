import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Container } from 'semantic-ui-react'
import { ToastContainer, Slide } from 'react-toastify'

import Router from './Router'
import AppHeader from './components/AppHeader'
import UserStore from './stores/UserStore'
import { LS_TOKEN_KEY } from './consts'
import getUserFromToken from './utils/getUserFromToken'

const App = () => {
  // effects
  useEffect(() => {
    window.addEventListener('storage', handleTokenChange)

    return () => {
      window.removeEventListener('storage', handleTokenChange)
    }
  }, [])

  // functions
  const handleTokenChange = (event) => {
    if (event.key === LS_TOKEN_KEY) {
      if (event.oldValue && !event.newValue) {
        // if logged out on another window/tab
        UserStore.logout()
      }

      if (!event.oldValue && event.newValue) {
        // if logged in on another window/tab
        const token = localStorage.getItem(LS_TOKEN_KEY)
        const userData = getUserFromToken(token)

        UserStore.login(userData)
      }
    }
  }

  // rendering
  return (
    <>
      <Container className="App">
        <AppHeader />
        <Router />
      </Container>

      <ToastContainer
        transition={Slide}
        position="bottom-left"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
      />
    </>
  )
}

export default observer(App)
