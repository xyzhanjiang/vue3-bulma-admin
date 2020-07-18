<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li class="is-active"><a href="#" aria-current="page">Dashboard</a></li>
    </ul>
  </nav>
  <section class="section">
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <article class="tile is-child box notification is-primary">
          <p class="title">439k</p>
          <p class="subtitle">Users</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box notification is-warning">
          <p class="title">59k</p>
          <p class="subtitle">Products</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box notification is-info">
          <p class="title">3.4k</p>
          <p class="subtitle">Open Orders</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box notification is-danger">
          <p class="title">19</p>
          <p class="subtitle">Exceptions</p>
        </article>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <article class="message is-link">
          <div class="message-header">
            <p>Chart</p>
          </div>
          <div class="message-body">
            <div id="chart1"></div>
          </div>
        </article>
      </div>
      <div class="column">
        <article class="message is-success">
          <div class="message-header">
            <p>Chart</p>
          </div>
          <div class="message-body">
            <div id="chart2"></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import ApexCharts from 'apexcharts'

import chartData from '@/data/chart'

export default {
  setup() {
    let chart1
    let chart2

    onMounted(() => {
      chart1 = new ApexCharts(document.querySelector('#chart1'), chartData[0])
      chart1.render()

      chart2 = new ApexCharts(document.querySelector('#chart2'), chartData[1])
      chart2.render()
    })
    onUnmounted(() => {
      // 在组件销毁的时候毁灭 chart
      chart1.destroy() // 插件的方法
      chart1 = null

      chart2.destroy()
      chart2 = null
    })
  }
}
</script>
