<template>
  <Nav/>
  <div class="section">
    <div class="columns">
      <div class="column is-2">
        <Menu/>
      </div>
      <div class="column is-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from '@/components/nav.vue'
import Menu from '@/components/menu.vue'
</script>
