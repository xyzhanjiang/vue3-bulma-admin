// import 'bulma/css/bulma.css'
import '@/css/bulmaswatch.scss'
import '@/css/style.css'

import { createApp } from 'vue'
import axios from 'axios'
import { createPinia } from 'pinia'

import router from '@/router'
import App from '@/app.vue'
import { useUserStore } from '@/store/user'
import { storeTokenKey } from '@/config'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')

const userStore = useUserStore()
const user = JSON.parse(localStorage.getItem(storeTokenKey))

if (user) {
  userStore.setUser(user)
  axios.defaults.headers.common['Authorization'] = user.token
}
