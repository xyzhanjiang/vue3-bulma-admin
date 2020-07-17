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
    add({ commit }, user) {
      return axiosInstance.post('/users', user)
    },
    del({ commit }, id) {
      // 然而并不会真的删除
      return axiosInstance.delete(`/users/${id}`)
    }
  }
}

export default store
