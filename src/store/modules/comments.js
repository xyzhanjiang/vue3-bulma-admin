import axios from 'axios'

const store = {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    add({ commit }, comment) {
      return axios.post('/api/comments', comment)
    },
    del({ commit }, id) {
      return axios.delete(`/api/comments/${id}`)
    }
  }
}

export default store
