import { setContext } from '@apollo/client/link/context'

import { LS_TOKEN_KEY } from '../../consts'

export default setContext(() => {
  const token = localStorage.getItem(LS_TOKEN_KEY)

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})
