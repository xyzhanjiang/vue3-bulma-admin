<template>
  <div class="app-posts">
    <app-nav></app-nav>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <router-link class="button is-primary is-block is-alt is-large" to="/posts/add">New Post</router-link>
          <aside class="menu">
            <p class="menu-label">
              Tags
            </p>
            <ul class="menu-list">
              <li><span class="tag is-primary is-medium ">Dashboard</span></li>
              <li><span class="tag is-link is-medium ">Customers</span></li>
              <li><span class="tag is-light is-danger is-medium ">Authentication</span></li>
              <li><span class="tag is-dark is-medium ">Payments</span></li>
              <li><span class="tag is-success is-medium ">Transfers</span></li>
              <li><span class="tag is-warning is-medium ">Balance</span></li>
              <li><span class="tag is-medium ">Question</span></li>
            </ul>
          </aside>
        </div>
        <div class="column is-9">
          <div v-if="error">{{error.message}}</div>
          <div v-else-if="isLoading && isDelayElapsed">Loading...</div>
          <div class="box" v-else-if="!isLoading">
            <article class="post" v-for="post in data.posts" :key="post.id">
              <h4 class="title is-5"><router-link :to="`/posts/post/${post.id}`">{{post.title}}</router-link></h4>
              <div class="media">
                <div class="media-left">
                  <p class="image is-32x32">
                    <img alt="avatar" src="@/images/logo.gif">
                  </p>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <template v-if="post.comments?.length">
                        <a href="#">@{{post.comments[post.comments.length - 1].author}}</a> replied {{formatDate(post.comments[post.comments.length - 1].date)}} &nbsp;
                      </template>
                      <template v-else>
                        <a href="#">@{{post.author}}</a> posted {{formatDate(post.date)}} &nbsp;
                      </template>
                      <span class="tag" v-for="tag in post.tags">{{tag}}</span>
                    </p>
                  </div>
                </div>
                <div class="media-right">
                  <span class="has-text-grey-light"><i class="fa fa-comments"></i> {{post.comments?.length}}</span>
                </div>
              </div>
            </article>
            <Pagination :page="page" :total-page="data.totalPage"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime) // 添加该插件 dayjs 才能使用 fromNow 方法

import { usePosts } from '@/common'
import appNav from '@/components/nav.vue'
import Pagination from '@/components/pagination.vue'

export default {
  setup() {
    const route = useRoute()
    const { error, data, isLoading, isDelayElapsed } = usePosts(() => route.query._page)
    const page = computed(() => +route.query._page || 1) // parse String to Number

    // 格式化时间 eg. a year ago
    function formatDate(date) {
      return dayjs(date).fromNow()
    }

    return {
      data,
      error,
      isLoading,
      isDelayElapsed,
      // 通过 ref, computed 等方法得到的响应式变量在模板中会自动展开
      // 不用写成 page.value 的形式
      page,
      formatDate
    }
  },
  components: {
    appNav,
    Pagination
  }
}
</script>

<style>
.app-posts {
  background: #f2f6fa;
}

.app-posts > .container > .columns {
  margin-top: 3rem;
}

.app-posts .button.is-primary.is-alt {
  background: #00c6ff;
  background-image: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}

.app-posts .menu {
  padding-top: 3rem;
}

.app-posts .menu-list {
  line-height: 1.5;
}

.app-posts .menu-label {
  padding-left: 10px;
  font-weight: 700;
}

.app-posts .menu-list li {
  padding: 5px;
}

.app-posts .media-left img {
  border-radius: 50%;
}

.app-posts .media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}

.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}

.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
</style>
