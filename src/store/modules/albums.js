import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

const store = {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    add({ commit }, item) {
      return axiosInstance.post('/albums', item)
    },
    getById({ commit }, id) {
      return axiosInstance.get(`/albums/${id}`)
    },
    edit({ commit }, item) {
      return axiosInstance.patch(`/albums/${item.id}`, item)
    },
    del({ commit }, id) {
      // 然而并不会真的删除
      return axiosInstance.delete(`/albums/${id}`)
    }
  }
}

export default store
