<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img alt="Logo" src="@/images/logo.gif" width="112" height="28">
      </a>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" active-class="is-active" to="/">Home</router-link>
        <router-link class="navbar-item" active-class="is-active" to="/about">About</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable" v-if="state.user">
          <a class="navbar-link">{{state.user.name}}</a>
          <div class="navbar-dropdown">
            <router-link class="navbar-item" to="/posts/add">New post</router-link>
            <hr class="navbar-divider">
            <a @click="logout" class="navbar-item">Logout</a>
          </div>
        </div>
        <div class="navbar-item" v-else>
          <div class="field is-grouped">
            <p class="control">
              <router-link class="button is-small" to="/register">
                <span class="icon">
                  <i class="fa fa-user-plus"></i>
                </span>
                <span>
                  Register
                </span>
              </router-link>
            </p>
            <p class="control">
              <router-link class="button is-small is-info is-outlined" to="/login">
                <span class="icon">
                  <i class="fa fa-user"></i>
                </span>
                <span>Login</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const { state, dispatch } = useStore()

    const logout = () => dispatch('logout')

    return {
      state,
      logout
    }
  }
}
</script>
