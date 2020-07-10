import { createStore } from 'vuex'
import axios from 'axios'

import posts from './modules/posts'
import comments from './modules/comments'

const store = createStore({
  modules: {
    posts,
    comments
  },
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
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
