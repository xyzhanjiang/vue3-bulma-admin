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
    add({ commit }, post) {
      return axiosInstance.post('/posts', post)
    },
    getById({ commit }, id) {
      return axiosInstance.get(`/posts/${id}`)
    },
    edit({ commit }, post) {
      return axiosInstance.patch(`/posts/${post.id}`, post)
    },
    del({ commit }, id) {
      return axiosInstance.delete(`/posts/${id}`)
    }
  }
}

export default store
