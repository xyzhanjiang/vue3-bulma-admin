import { ref, watchEffect } from 'vue'
import axios from 'axios'

const pageSize = 5

/**
 * @param {Function} getData
 */
export function useData(getData) {
  // ref 方法返回一个 Object
  // 如果传给 ref 的值为 Object，将自动对其调用 reactive 方法
  const error = ref(null)
  const data = ref(null)
  const isLoading = ref(false)
  const isDelayElapsed = ref(false)

  // watchEffect 会在组件卸载时自动停止
  // watchEffect 会返回一个停止函数，也可以在需要时手动停止
  watchEffect(() => {
    // ref 返回的值包含在 value 属性中，读取修改值的时候都要通过 value 属性
    error.value = null
    data.value = null
    isLoading.value = true
    isDelayElapsed.value = false

    getData().then((_data) => {
      data.value = _data
    }).catch((err) => error.value = err).finally(() => isLoading.value = false)

    // 如果毫秒以内数据就返回了，就不展示 Loading 了
    setTimeout(() => isDelayElapsed.value = true, 200)
  })

  return {
    error,
    data,
    isLoading,
    isDelayElapsed
  }
}

/**
 * @param {Function} getPage
 */
export function usePosts(getPage) {
  return useData(() => {
    const page = getPage() || 1
    return axios.get(`/api/posts?_embed=comments&_page=${page}&_limit=${pageSize}&_sort=id&_order=desc`).then(({ headers, data }) => {
      return {
        posts: data,
        totalPage: Math.ceil(headers['x-total-count'] / pageSize)
      }
    })
  })
}

/**
 * @param {Function} getId
 */
export function usePost(getId) {
  return useData(() => {
    const id = getId()
    return Promise.all([
      axios.get(`/api/posts/${id}`),
      axios.get(`/api/posts/${id}/comments?_embed=replies`)
    ]).then(([res1, res2]) => {
      return ({
        post: res1.data,
        comments: res2.data
      })
    })
  })
}
