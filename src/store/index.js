import { createStore } from 'vuex'
import axios from 'axios'

import albums from './modules/albums'
import comments from './modules/comments'
import photos from './modules/photos'
import posts from './modules/posts'
import todos from './modules/todos'
import users from './modules/users'

import { storeTokenKey } from '@/config'

const store = createStore({
  modules: {
    albums,
    comments,
    photos,
    posts,
    todos,
    users
  },
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      if (user) {
        axios.defaults.headers.common['Authorization'] = user.token
        localStorage.setItem(storeTokenKey, JSON.stringify(user))
      } else {
        // 删除 request header 里的信息
        localStorage.removeItem(storeTokenKey)
      }
    }
  },
  actions: {
    login({ commit }, user) {
      return axios.post('/login', user).then(({ data }) => {
        commit('setUser', {
          name: user.name,
          token: data.token
        })
      })
    },
    logout({ commit }) {
      // 登出只是简单地删除用户信息，并没有发出请求
      commit('setUser', null)
    }
  }
})

export default store
