import { defineStore } from 'pinia'
import axios from 'axios'

import { storeTokenKey } from '@/config'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useUserStore = defineStore('user', {
  // a function that returns a fresh state
  state: () => ({
    user: null
  }),

  actions: {
    setUser(user) {
      this.user = user
      if (user) {
        axios.defaults.headers.common['Authorization'] = user.token
        localStorage.setItem(storeTokenKey, JSON.stringify(user))
      } else {
        // 删除 request header 里的信息
        localStorage.removeItem(storeTokenKey)
      }
    },
    login(user) {
      return axios.post('/login', user).then(({ data }) => {
        this.setUser({
          name: user.name,
          token: data.token
        })
      })
    },
    async logout() {
      // 登出只是简单地删除用户信息，并没有发出请求
      this.setUser(null)
    }
  },
})
