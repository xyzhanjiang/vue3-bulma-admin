import axios from 'axios'

const store = {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    add({ commit }, post) {
      return axios.post('/api/posts', post)
    },
    del({ commit }, id) {
      return axios.delete(`/api/posts/${id}`)
    }
  }
}

export default store
