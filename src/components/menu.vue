<template>
<aside class="menu">
  <p class="menu-label">
    General
  </p>
  <ul class="menu-list">
    <!-- TODO -->
    <li>
      <router-link exact to="/">
        <span class="icon is-small">
          <i class="fa fa-user"></i>
        </span> Dashboard
      </router-link>
    </li>
  </ul>
  <p class="menu-label">
    Administration
  </p>
  <ul class="menu-list">
    <li>
      <router-link to="/posts">
        <span class="icon is-small">
          <i class="fa fa-file"></i>
        </span> Posts
      </router-link>
    </li>
  </ul>
  <p class="menu-label">
    Transactions
  </p>
  <ul class="menu-list">
    <li><router-link to="/form">Form</router-link></li>
  </ul>
</aside>
</template>
