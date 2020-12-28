import { makeObservable, observable, action, computed } from 'mobx'
import { toast } from 'react-toastify'

import { LS_TOKEN_KEY, SESSION_EXPIRED_MESSAGE } from '../consts'
import getUserFromToken from '../utils/getUserFromToken'

class UserStore {
  user = null

  constructor() {
    makeObservable(this, {
      user: observable,
      login: action,
      logout: action,
      isLoggedIn: computed,
      getUser: computed,
    })

    if (localStorage.getItem(LS_TOKEN_KEY)) {
      const token = localStorage.getItem(LS_TOKEN_KEY)
      const user = getUserFromToken(token)

      if (user.exp * 1_000 < Date.now()) {
        localStorage.removeItem(LS_TOKEN_KEY)
        toast(SESSION_EXPIRED_MESSAGE)
      } else {
        this.user = user
      }
    }
  }

  login = (userData) => {
    localStorage.setItem(LS_TOKEN_KEY, userData.token)
    this.user = userData
  }

  logout = () => {
    localStorage.removeItem(LS_TOKEN_KEY)
    this.user = null
  }

  get isLoggedIn() {
    return !!this.user?.token
  }

  get getUser() {
    return this.user
  }
}

export default new UserStore()
