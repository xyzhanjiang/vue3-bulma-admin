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
      return axiosInstance.post('/photos', item)
    },
    getById({ commit }, id) {
      return axiosInstance.get(`/photos/${id}`)
    },
    edit({ commit }, item) {
      return axiosInstance.patch(`/photos/${item.id}`, item)
    },
    del({ commit }, id) {
      // 然而并不会真的删除
      return axiosInstance.delete(`/photos/${id}`)
    }
  }
}

export default store
