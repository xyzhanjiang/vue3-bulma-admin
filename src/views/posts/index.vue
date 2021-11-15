<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><a href="../">Posts</a></li>
      <li class="is-active"><a href="#" aria-current="page">List</a></li>
    </ul>
  </nav>

  <nav class="level">
    <!-- Left side -->
    <div class="level-left">
      <div class="level-item">
        <div class="field has-addons">
          <p class="control">
            <input v-model="searchKeyWord" class="input" type="text" placeholder="Find a post">
          </p>
          <p class="control">
            <button @click="search" class="button is-link" type="button">
              Search
            </button>
          </p>
        </div>
      </div>
    </div>

    <div class="level-right">
      <p class="level-item"><button @click.prevent="refresh" class="button is-link" :class="isSubmitting && 'is-loading'" :disabled="isSubmitting" type="button">Refresh</button></p>
      <p class="level-item"><router-link class="button is-link" to="/users/add">New</router-link></p>
    </div>
  </nav>

  <div class="content">
    <div v-if="error">{{error.message}}</div>
    <div v-else-if="isLoading && isDelayElapsed">Loading...</div>
    <table class="table is-fullwidth is-striped" v-else-if="!isLoading">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Name</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in data.items">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.user?.name}}</td>
          <td>{{item.comments?.length}}</td>
          <td>
            <div class="buttons">
              <a @click.prevent="getItem(item.id)" class="button is-small is-primary" href="#">
                <span class="icon is-small">
                  <i class="fa fa-edit"></i>
                </span>
              </a>
              <a @click.prevent="delItem(item)" class="button is-small is-danger" href="#">
                <span class="icon is-small">
                  <i class="fa fa-times"></i>
                </span>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="data">
    <Pagination :page="page" :total-page="data.totalPage"/>
  </div>

  <Modal class="modal-fade" :isShown="editModal">
    <div class="modal-background"></div>
    <form @submit.prevent="editItem" action="#" method="post">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit post</p>
          <button @click="editModal = false" class="delete" aria-label="close" type="button"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column"> 
              <label class="label">Title</label>
              <p class="control">
                <input class="input" type="text" placeholder="Title"
                  v-model="selectedItem.title">
              </p>
              <label class="label">Content</label>
              <p class="control">
                <textarea class="textarea" placeholder="Content"
                  v-model="selectedItem.body"></textarea>
              </p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" :class="isSubmitting && 'is-loading'" type="submit">Save</button>
          <button @click="editModal = false" class="button" type="button">Cancel</button>
        </footer>
      </div>
    </form>
  </Modal>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { usePosts } from '@/common'
import Modal from '@/components/modal.vue'
import Pagination from '@/components/pagination.vue'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { dispatch } = useStore()
    const { error, data, isLoading, isDelayElapsed } = usePosts(() => ({
      accountName: route.query.accountName,
      _page: route.query._page || 1
    }))
    // parse String to Number, 从路由取出的参数是字符串
    const page = computed(() => +route.query._page || 1)

    const isSubmitting = ref(false)

    // 刷新动态路由
    // TODO 不共用同一个 isSubmitting 变量
    const refresh = async () => {
      //
    }

    // TODO 切换成 usePost 方法
    const selectedItem = reactive({})
    const editModal = ref(false)
    function getItem(id) {
      dispatch('posts/getById', id).then((res) => {
        // TODO Need Object.assign polyfill
        Object.assign(selectedItem, res.data)
        editModal.value = true
      }).catch((err) => alert(err.message))
    }

    // TODO 压缩数据，当前提交的是整个 post，可以优化为只提交有修改的数据
    function editItem() {
      isSubmitting.value = true
      dispatch('posts/edit', selectedItem)
        .then((res) => {
          editModal.value = false
          // 获取该条数据的 index
          let index = data.value.items.findIndex((item) => item.id === selectedItem.id)
          // 将该条数据取出来，splice 返回的是一个数组
          let item = data.value.items.splice(index, 1)[0]
          // 打上补丁
          Object.assign(item, res.data)
          // 放回到原来的位置
          data.value.items.splice(index, 0, item)
          // TODO 更科学的做法
        })
        .catch((err) => alert(err.message))
        .finally(() => isSubmitting.value = false)
    }

    function delItem(post) {
      if (!window.confirm('Sure?')) return
      dispatch('posts/del', post.id).then(() => {
        // 根据 index 删除该条数据
        // TODO remove value
        data.value.items.splice(data.value.items.indexOf(post), 1)
        console.log('Delete complete!')
      }).catch((err) => {
        alert(err.message)
      })
    }

    // 搜索关键字
    const searchKeyWord = ref(route.query.accountName)

    // 搜索
    const search = () => {
      router.push({
        path: route.path,
        query: {
          accountName: searchKeyWord.value
        }
      })
    }

    return {
      data,
      error,
      isLoading,
      isDelayElapsed,
      // 通过 ref, computed 等方法得到的响应式变量在模板中会自动展开
      // 不用写成 page.value 的形式
      page,
      isSubmitting,
      refresh,
      selectedItem,
      editModal,
      getItem,
      editItem,
      delItem,
      searchKeyWord,
      search
    }
  },
  components: {
    Modal,
    Pagination
  }
}
</script>
