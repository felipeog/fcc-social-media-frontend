import React from 'react'
import { Container } from 'semantic-ui-react'

import Router from './Router'
import AppHeader from './components/AppHeader'

const App = () => {
  return (
    <Container>
      <AppHeader />
      <Router />
    </Container>
  )
}

export default App
