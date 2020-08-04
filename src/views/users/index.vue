<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><a href="../">Users</a></li>
      <li class="is-active"><a href="#" aria-current="page">List</a></li>
    </ul>
  </nav>

  <div class="content">
    <div v-if="error">{{error.message}}</div>
    <div v-else-if="isLoading && isDelayElapsed">Loading...</div>
    <table class="table is-fullwidth is-striped" v-else-if="!isLoading">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in data.users">
          <td>{{item.id}}</td>
          <td>{{item.username}}</td>
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.website}}</td>
          <td>
            <div class="buttons">
              <a @click.prevent="getUser(item)" class="button is-small is-primary" href="#">
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
      <div
        class="has-text-primary">
        Showing 1 to 10 of 49 entries
      </div>
    </div>
    <div class="column">
      <Pagination :page="page" :total-page="data.totalPage"/>
    </div>
  </div>

  <Modal class="modal-fade" :isShown="editModal">
    <div class="modal-background"></div>
    <form @submit.prevent="editUser" action="#" method="post">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit user</p>
          <button
            @click="editModal = false"
            class="delete"
            aria-label="close"
            type="button"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-6">
              <label class="label">Username</label>
              <p class="control">
                <input
                  class="input"
                  placeholder="Username"
                  type="text"
                  v-model="selectedUser.username">
              </p>
              <label class="label">Email</label>
              <p class="control">
                <input
                  class="input"
                  placeholder="Email"
                  type="text"
                  v-model="selectedUser.email">
              </p>
              <label class="label">Website</label>
              <p class="control">
                <input
                  class="input"
                  placeholder="Website"
                  type="text"
                  v-model="selectedUser.website">
              </p>
            </div>
            <div class="column is-6">
              <label class="label">Name</label>
              <p class="control">
                <input
                  class="input" placeholder="Name" type="text"
                  v-model="selectedUser.name">
              </p>
              <label class="label">Phone</label>
              <p class="control">
                <input
                  class="input"
                  placeholder="Phone"
                  type="text"
                  v-model="selectedUser.phone">
              </p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-primary"
            :class="{'is-loading': isSubmitting}"
            type="submit">Save</button>
          <button
            @click="editModal = false"
            class="button"
            type="button">Cancel</button>
        </footer>
      </div>
    </form>
  </Modal>

  <div class="modal" :class="{'is-active': confirmModal}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Message
          </p>
          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            Are you sure?
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item has-text-info">Confirm</a>
          <a href="#" class="card-footer-item">Cancel</a>
        </footer>
      </div>
    </div>
    <button @click="confirmModal = false" class="modal-close is-large" aria-label="close" type="button"></button>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { useUsers } from '@/common'
import Modal from '@/components/modal.vue'
import Pagination from '@/components/pagination.vue'

export default {
  setup() {
    const route = useRoute()
    const { dispatch } = useStore()
    const { error, data, isLoading, isDelayElapsed } = useUsers(() => route.query._page)
    const page = computed(() => +route.query._page || 1) // parse String to Number

    const isSubmitting = ref(false)
    const confirmModal = ref(false)

    // TODO 切换成 useUser 方法
    const selectedUser = reactive({})
    const editModal = ref(false)
    function getUser(user) {
      dispatch('users/getById', user.id).then((res) => {
        // TODO Need Object.assign polyfill
        Object.assign(selectedUser, res.data)
        editModal.value = true
      }).catch((err) => alert(err.message))
    }

    // TODO 压缩数据，当前提交的是整个 user，可以优化为只提交有修改的数据
    function editUser() {
      isSubmitting.value = true
      dispatch('users/edit', selectedUser)
        .then((res) => {
          editModal.value = false
          let index = data.value.users.findIndex((item) => item.id === selectedUser.id)
          data.value.users.splice(index, 1, res.data)
        })
        .catch((err) => alert(err.message))
        .finally(() => isSubmitting.value = false)
    }

    function delUser(user) {
      if (!window.confirm('Sure?')) return
      dispatch('users/del', user.id).then(() => {
        // 根据 comment 的 index 删除该条数据
        // TODO remove value
        data.value.users.splice(data.value.users.indexOf(user), 1)
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
      isSubmitting,
      confirmModal,
      selectedUser,
      editModal,
      getUser,
      editUser,
      delUser
    }
  },
  components: {
    Modal,
    Pagination
  }
}
</script>
