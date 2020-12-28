import { onError } from '@apollo/client/link/error'
import { toast } from 'react-toastify'

import { SESSION_EXPIRED_MESSAGE } from '../../consts'
import UserStore from '../../stores/UserStore'

const stringify = (input) => JSON.stringify(input)

export default onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path, extensions: { code } }) => {
      console.error('[GraphQL error]')
      console.group()
      console.error(`Message: ${stringify(message)}`)
      console.error(`Code: ${stringify(code)}`)
      console.error(`Operation: ${stringify(operation.operationName)}`)
      console.error(`Locations: ${stringify(locations)}`)
      console.error(`Path: ${stringify(path)}`)
      console.groupEnd()

      if (code === 'UNAUTHENTICATED') {
        UserStore.logout()
        toast(SESSION_EXPIRED_MESSAGE)
      }
    })
  }

  if (networkError) {
    console.error(`[Network error]: ${stringify(networkError)}`)
  }
})
