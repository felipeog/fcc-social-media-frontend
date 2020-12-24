import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import ApolloProvider from './ApolloProvider'
import { UserProvider } from './context/User'
import App from './App'

ReactDOM.render(
  <ApolloProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
