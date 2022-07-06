<template>
  <div class="app-login">
    <div class="container">
      <div class="column is-4 is-offset-4 app-login-box">
        <h1 class="title is-4">Login</h1>
        <p class="app-login-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
        <form @submit.prevent="login" action="#" method="post">
          <div class="field">
            <div class="control">
              <input class="input is-medium" required type="text" placeholder="Name" v-model="user.name">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input is-medium" type="password" placeholder="Password" v-model="user.password">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-block is-link is-fullwidth is-medium" type="submit">Login</button>
            </div>
          </div>
          <small><em>输入任意内容即可登录.</em></small>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/store/user'

const { push } = useRouter()
const { query } = useRoute()
const userStore = useUserStore()

const user = reactive({
  name: '',
  password: ''
})

const login = () => {
  userStore.login(user).then(() => {
    push(query.redirect || '/')
  })
}
</script>

<style>
/* TODO custom media */
@custom-media --viewport-tablet (min-width: 769px);

:root {
  --login-color: hsl(166, 67%, 51%);
  --bg:          rgb(247, 247, 247);
  --text-dark:   hsla(0, 0%, 0%, 0.66);
  --text-light:  hsla(0, 0%, 0%, 0.33);
}

.app-login {
  color: var(--text-dark);
}

@media (min-width: 769px) {
  .app-login {
    padding-top: 8rem;
  }
}

.app-login-box {
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 4.5rem;
  text-align: center;
  /* 嵌套规则需要在 postcss.config.js 里开启 */
  & .title {
    font-weight: 800;
  }
}

.app-login-description {
  color: var(--text-light);
  font-size: 1.15rem;
  margin: 1rem 0;
}
</style>
