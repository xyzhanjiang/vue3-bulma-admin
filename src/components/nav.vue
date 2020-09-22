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
        <span class="icon is-medium"><i class="fa fa-home"></i></span>
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
            <span class="icon is-small"><i class="fa fa-user-o"></i></span>
            &nbsp; Profile
          </router-link>
          <hr class="navbar-divider">
          <a @click="logout" class="navbar-item">
            <span class="icon is-small"><i class="fa fa-power-off"></i></span>
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
