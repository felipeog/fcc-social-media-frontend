import { createHttpLink } from '@apollo/client'

export default createHttpLink({
  uri: 'http://localhost:5000',
})
