import 'bulma/css/bulma.css'
import '@/css/style.css'

import { createApp } from 'vue'
import axios from 'axios'

import router from '@/router'
import store from '@/store'
import App from '@/app.vue'
import { storeTokenKey } from '@/config'

const user = JSON.parse(localStorage.getItem(storeTokenKey))

if (user) {
  store.commit('setUser', user)
  axios.defaults.headers.common['Authorization'] = user.token
}

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
