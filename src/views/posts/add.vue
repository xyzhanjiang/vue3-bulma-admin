<template>
  <app-nav></app-nav>
  <div class="container app-post-new">
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-content">
            <form @submit.prevent="addPost" action="#" method="post">
              <h2 class="title">New post</h2>
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input class="input is-medium" required type="text" placeholder="Title" v-model="post.title">
                </div>
              </div>
              <div class="field">
                <label class="label">Content</label>
                <div class="control">
                  <textarea @input="update" class="textarea is-medium" placeholder="markdown" required :readonly="isSubmitting" :value="post.content"></textarea>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button is-link is-fullwidth has-text-weight-medium is-medium" :class="{'is-loading': isSubmitting}" :disabled="isSubmitting" type="submit">Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="column">
        <h1 class="title is-1 has-text-centered">{{post.title}}</h1>
        <div class="content" v-html="output"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import marked from 'marked'
import { debounce } from 'lodash'

import appNav from '@/components/nav.vue'

const delay = 400 // 防抖动时间

export default {
  setup() {
    const { state } = useStore()
    const router = useRouter()

    const post = reactive({
      title: 'Title here',
      content: '# Hello'
    })

    const output = computed(() => marked(post.content))
    const update = debounce((e) => { post.content = e.target.value }, delay)

    const isSubmitting = ref(false)

    function addPost() {
      isSubmitting.value = true
      axios.post('/api/posts', {
        title: post.title,
        content: post.content,
        author: state.user?.name || 'NameLess',
        date: new Date(),
        tags: ['Question']
      }).then(() => {
        router.push('/')
      }).catch((err) => {
        alert(err.message)
      }).finally(() => {
        isSubmitting.value = false
      })
    }

    return {
      post,
      output,
      update,
      isSubmitting,
      addPost
    }
  },
  components: { appNav }
}
</script>

<style>
.app-post-new {
  margin-top: 2rem;
}
</style>
