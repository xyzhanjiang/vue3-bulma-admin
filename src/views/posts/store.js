import { defineStore } from 'pinia'
import axios from 'axios'

import { pageSize } from '@/config'

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const usePostStore = defineStore('post', {
  // a function that returns a fresh state
  state: () => ({
    error: null,
    items: [],
    totalPage: 0,
  }),

  actions: {
    async queryList(params) {
      this.error = null
      try {
        const response = await axios.get('/posts', {
          params: {
            pageSize,
            page: params.page,
            accountName: params.accountName
          }
        })
        this.items = response.data
        this.totalPage = 10
      } catch (err) {
        this.error = err
      }
    },
    add(item) {
      return axiosInstance.post('/posts', item)
    },
    getById(id) {
      return axiosInstance.get(`/posts/${id}`)
    },
    edit(item) {
      return axiosInstance.patch(`/posts/${item.id}`, item)
    },
    del(id) {
      return axiosInstance.delete(`/posts/${id}`)
    }
  },
})
