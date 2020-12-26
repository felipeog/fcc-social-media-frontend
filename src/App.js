import React from 'react'

import Router from './Router'
import AppHeader from './components/AppHeader'

const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <Router />
    </div>
  )
}

export default App
