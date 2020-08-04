import axios from 'axios'

// 创建一个 axios 实例，该文件内请求均使用这个实例
// 其它文件不受影响
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

const store = {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    add({ commit }, item) {
      return axiosInstance.post('/posts', item)
    },
    getById({ commit }, id) {
      return axiosInstance.get(`/posts/${id}`)
    },
    edit({ commit }, item) {
      return axiosInstance.patch(`/posts/${item.id}`, item)
    },
    del({ commit }, id) {
      return axiosInstance.delete(`/posts/${id}`)
    }
  }
}

export default store
