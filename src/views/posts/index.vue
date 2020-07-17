<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><a href="../">Posts</a></li>
      <li class="is-active"><a href="#" aria-current="page">List</a></li>
    </ul>
  </nav>
  <section class="info-tiles">
  </section>

  <p class="title">Posts</p>

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
          <td>{{item.user.name}}</td>
          <td>
            <div class="buttons">
              <a @click.prevent="editModal = true" class="button is-small is-primary" href="#">
                <span class="icon is-small">
                  <i class="fa fa-edit"></i>
                </span>
              </a>
              <a @click.prevent="delUser(item)" class="button is-small is-danger" href="#">
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
      <div class="has-text-primary" role="status" aria-live="polite">Showing 1 to 10 of 49 entries</div>
    </div>
    <div class="column">
      <Pagination :page="page" :total-page="data.totalPage"/>
    </div>
  </div>

  <div class="modal is-small" :class="{'is-active': editModal}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit user</p>
        <button @click="editModal = false" class="delete" aria-label="close" type="button"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column"> 
            <label class="label">Title</label>
            <p class="control">
              <input class="input" type="text" placeholder="Title">
            </p>
            <label class="label">Content</label>
            <p class="control">
              <textarea class="textarea" placeholder="Content"></textarea>
            </p>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary">Save</button>
        <button @click="editModal = false" class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { usePosts } from '@/common'
import Pagination from '@/components/pagination.vue'

export default {
  setup() {
    const route = useRoute()
    const { error, data, isLoading, isDelayElapsed } = usePosts(() => route.query._page)
    const page = computed(() => +route.query._page || 1) // parse String to Number
    const editModal = ref(false)

    return {
      data,
      error,
      isLoading,
      isDelayElapsed,
      // 通过 ref, computed 等方法得到的响应式变量在模板中会自动展开
      // 不用写成 page.value 的形式
      page,
      editModal
    }
  },
  components: {
    Pagination
  }
}
</script>