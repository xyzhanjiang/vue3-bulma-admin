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
        <p class="subtitle is-5">
          <strong>49</strong> posts
        </p>
      </div>
      <div class="level-item">
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" placeholder="Find a post">
          </p>
          <p class="control">
            <button class="button">
              Search
            </button>
          </p>
        </div>
      </div>
    </div>

    <div class="level-right">
      <p class="level-item"><strong>All</strong></p>
      <p class="level-item"><a>Published</a></p>
      <p class="level-item"><a>Drafts</a></p>
      <p class="level-item"><a>Deleted</a></p>
      <p class="level-item"><a class="button is-success">New</a></p>
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in data.posts">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.user?.name}}</td>
          <td>
            <div class="buttons">
              <a @click.prevent="getPost(item.id)" class="button is-small is-primary" href="#">
                <span class="icon is-small">
                  <i class="fa fa-edit"></i>
                </span>
              </a>
              <a @click.prevent="delPost(item)" class="button is-small is-danger" href="#">
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
  <div class="columns" v-if="data">
    <div class="column">
      <div class="has-text-primary">Showing 1 to 10 of 49 entries</div>
    </div>
    <div class="column">
      <Pagination :page="page" :total-page="data.totalPage"/>
    </div>
  </div>

  <Modal class="is-small" :isShown="editModal">
    <div class="modal-background"></div>
    <form @submit.prevent="editPost" action="#" method="post">
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
                  v-model="selectedPost.title">
              </p>
              <label class="label">Content</label>
              <p class="control">
                <textarea class="textarea" placeholder="Content"
                  v-model="selectedPost.body"></textarea>
              </p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary">Save</button>
          <button @click="editModal = false" class="button">Cancel</button>
        </footer>
      </div>
    </form>
  </Modal>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { usePosts } from '@/common'
import { getScrollbarWidth } from '@/common/util'
import Modal from '@/components/modal.vue'
import Pagination from '@/components/pagination.vue'

export default {
  setup() {
    const route = useRoute()
    const { dispatch } = useStore()
    const { error, data, isLoading, isDelayElapsed } = usePosts(() => route.query._page)
    // parse String to Number, 从路由取出的参数是字符串
    const page = computed(() => +route.query._page || 1)

    // TODO 切换成 useUser 方法
    const selectedPost = reactive({})
    const editModal = ref(false)
    function getPost(id) {
      dispatch('posts/getById', id).then((res) => {
        // TODO Need Object.assign polyfill
        Object.assign(selectedPost, res.data)
        editModal.value = true
      }).catch((err) => alert(err.message))
    }

    // TODO 压缩数据，当前提交的是整个 post，可以优化为只提交有修改的数据
    function editPost() {
      dispatch('posts/edit', selectedPost).then((res) => {
        editModal.value = false
        let index = data.value.posts.findIndex((item) => item.id === selectedPost.id)
        data.value.posts.splice(index, 1, res.data)
      }).catch((err) => alert(err.message))
    }

    function delPost(post) {
      if (!window.confirm('Sure?')) return
      dispatch('posts/del', post.id).then(() => {
        // 根据 comment 的 index 删除该条数据
        // TODO remove value
        data.value.posts.splice(data.value.posts.indexOf(post), 1)
        console.log('Delete complete!')
      }).catch((err) => {
        alert(err.message)
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
      selectedPost,
      editModal,
      getPost,
      editPost,
      delPost
    }
  },
  components: {
    Modal,
    Pagination
  }
}
</script>
