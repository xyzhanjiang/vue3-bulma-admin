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
      <p class="level-item"><router-link class="button is-link" to="/users/add">New</router-link></p>
    </div>
  </nav>

  <div class="content">
    <div v-if="error">{{error.message}}</div>
    <div v-else-if="isLoading">Loading...</div>
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
        <tr :key="item.id" v-for="item in items">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.user?.name}}</td>
          <td>{{item.comments?.length}}</td>
          <td>
            <div class="buttons">
              <a
                @click.prevent="getItem(item.id)"
                class="button is-small is-primary"
                :class="detailLoading.includes(item.id) && 'is-loading'"
                href="#"
              >
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
  <div v-if="totalPage">
    <Pagination :page="page" :total-page="totalPage"/>
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

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { usePosts } from '@/common'
import Modal from '@/components/modal.vue'
import Pagination from '@/components/pagination.vue'

import { usePostStore } from './store'

const postStore = usePostStore()
const { push } = useRouter()
const route = useRoute()

const { error, items, totalPage } = storeToRefs(postStore)

const isLoading = ref(false)
const getList = async () => {
  isLoading.value = true
  await postStore.queryList({
    accountName: route.query.accountName,
    page: route.query._page || 1
  })
  isLoading.value = false
} 

// parse String to Number, 从路由取出的参数是字符串
const page = computed(() => +route.query._page || 1)

const isSubmitting = ref(false)

const selectedItem = reactive({})
const editModal = ref(false)
const detailLoading = ref([])
function getItem(id) {
  detailLoading.value = [id]
  postStore.getById(id).then((res) => {
    // TODO Need Object.assign polyfill
    Object.assign(selectedItem, res.data)
    editModal.value = true
  }).catch((err) => alert(err.message)).finally(() => detailLoading.value = [])
}

// 编辑
function editItem() {
  isSubmitting.value = true
  postStore.edit(selectedItem)
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

// 删除
function delItem(post) {
  if (!window.confirm('Sure?')) return
  postStore.del(post.id).then(() => {
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
  push({
    path: route.path,
    query: {
      accountName: searchKeyWord.value
    }
  })
}

onMounted(() => {
  getList()
})
</script>
