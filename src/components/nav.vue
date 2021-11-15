<template>
<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link class="navbar-item brand-text" to="/">
      Bulma Admin
    </router-link>
    <a @click="isNavBarShown = !isNavBarShown" role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': isNavBarShown}">
    <div class="navbar-start">
      <router-link class="navbar-item is-tab" to="/">
        <span class="icon is-medium">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </span>
        Home
      </router-link>
      <router-link class="navbar-item is-tab" active-class="is-active" to="/about">About</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          <figure class="image is-32x32">
            <img alt="avatar" class="is-rounded"
              src="@/images/logo.png" style="max-height: none;">
          </figure>
          <span>&nbsp;by.Genesis</span>
        </a>
        <div class="navbar-dropdown">
          <router-link class="navbar-item" to="/about">
            <span class="icon is-small">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            &nbsp; Profile
          </router-link>
          <hr class="navbar-divider">
          <a @click="logout" class="navbar-item">
            <span class="icon is-small">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </span>
            &nbsp; Logout
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const { push } = useRouter()
    const { state, dispatch } = useStore()
    const isNavBarShown = ref(false)

    const logout = () => dispatch('logout').then(() => {
      push('/login')
    })

    return {
      state,
      logout,
      isNavBarShown
    }
  }
}
</script>
