<template>
  <app-nav></app-nav>
  <div class="container">
    <div class="column is-8 is-offset-2">
      <div v-if="error">{{error.message}}</div>
      <div v-else-if="isLoading && isDelayElapsed">Loading...</div>
      <div class="card article" v-else-if="!isLoading && data.post">
        <div class="card-content">
          <div class="media">
            <div class="media-content has-text-centered">
              <p class="title article-title">{{data.post.title}}</p>
              <div class="tags has-addons level-item">
                <span class="tag is-rounded is-info">@{{data.post.author}}</span>
                <span class="tag is-rounded">{{formatDate(data.post.date)}}</span>
              </div>
            </div>
          </div>
          <div class="content article-body" v-html="formatContent(data.post.content)"></div>
        </div>
      </div>
      <!-- end .article -->

      <div class="box" v-if="!isLoading">
        <div class="media" v-for="item in data.comments" :key="item.id">
          <div class="media-left">
            <p class="image is-64x64">
              <img alt="avatar" src="@/images/logo.gif">
            </p>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{item.author}}</strong>
                <br>
                {{item.content}}
                <br>
                <small><a>Like</a> · <a>Reply</a> · {{formatDate(item.date)}}</small>
              </p>
            </div>
            <article class="media" v-for="item in item.replies" :key="item.id">
              <figure class="media-left">
                <p class="image is-48x48">
                  <img alt="avatar" src="@/images/logo.gif">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{item.author}}</strong>
                    <br>
                    {{item.content}}
                    <br>
                    <small><a>Like</a> · <a>Reply</a> · {{formatDate(item.date)}}</small>
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div class="media-right">
            <button @click="delComment(item)" class="delete" type="button"></button>
          </div>
        </div>

        <div class="media">
          <div class="media-left">
            <p class="image is-64x64">
              <img alt="avatar" src="@/images/logo.gif">
            </p>
          </div>
          <div class="media-content">
            <form @submit.prevent="addComment" action="#" method="post">
              <div class="field">
                <p class="control">
                  <textarea class="textarea" placeholder="Add a comment..." :readonly="isSubmitting" v-model="content"></textarea>
                </p>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button is-link" :class="{'is-loading': isSubmitting}" :disabled="isSubmitting" type="submit">Post comment</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { flow } from 'lodash'
import dayjs from 'dayjs'
import marked from 'marked'
import DOMPurify from 'dompurify'

import { usePost } from '@/common'
import appNav from '@/components/nav.vue'

export default {
  setup() {
    const route = useRoute()
    const { state, dispatch } = useStore()

    const content = ref('')
    const isSubmitting = ref(false)

    function addComment() {
      // 添加 comment，请求时提交按钮展示 Loading，并不可点击，同时文本框不可修改
      isSubmitting.value = true

      /**
       * comment 格式
       * {
       *   author
       *   content
       *   date
       *   postId
       * }
       */
      const comment = {
        author: state.user?.name || 'NameLess',
        content: content.value,
        date: new Date(),
        postId: route.params.id
      }

      dispatch('comments/add', comment).then((res) => {
        data.value.comments.push(res.data)
        content.value = ''
      }).catch((err) => {
        alert(err.message)
      }).finally(() => {
        isSubmitting.value = false
      })
    }

    function delComment(comment) {
      if (!window.confirm('Sure?')) return
      dispatch('comments/del', comment.id).then(() => {
        // 根据 comment 的 index 删除该条数据
        // TODO remove value
        data.value.comments.splice(data.value.comments.indexOf(comment), 1)
        console.log('Delete complete!')
      }).catch((err) => {
        alert(err.message)
      })
    }

    // 格式化时间 eg. Jun 07, 2019
    function formatDate(date) {
      return dayjs(date).format('MMM DD, YYYY')
    }

    // 将 markdown 格式到文本转换为 HTML
    // 同时去掉不安全到内容
    // 因为这个内容会使用 v-html 指令挂载到 DOM
    const formatContent = flow(marked, DOMPurify.sanitize)

    // watch route.params.id
    const { error, data, isLoading, isDelayElapsed } = usePost(() => route.params.id)

    return {
      addComment,
      delComment,
      error,
      data,
      isLoading,
      isDelayElapsed,
      content,
      isSubmitting,
      formatContent,
      formatDate
    }
  },
  components: {
    appNav
  }
}
</script>
