import 'bulma/css/bulma.css'
import '@/css/style.css'

import { createApp } from 'vue'

import router from '@/router'
import store from '@/store'
import App from '@/app.vue'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
