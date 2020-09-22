<template>
<nav class="pagination is-small is-centered" role="navigation">
  <ul class="pagination-list">
    <li>
      <router-link class="pagination-link" aria-label="`Goto page ${pagePrev}`" :disabled="page === 1" :to="`?_page=${pagePrev}`">Previous</router-link>
    </li>
    <li v-show="page > 2">
      <router-link class="pagination-link" aria-label="Goto page 1" to="?_page=1">1</router-link>
    </li>
    <li v-show="totalPage > 5 && page > 3">
      <span class="pagination-ellipsis">&hellip;</span>
    </li>
    <li v-show="page === totalPage && totalPage > 4">
      <router-link class="pagination-link" :aria-label="`Goto page ${pagePrev - 2}`" :to="`?_page=${pagePrev - 2}`">{{pagePrev - 2}}</router-link>
    </li>
    <li v-show="page > totalPage - 1 && totalPage > 3">
      <router-link class="pagination-link" :aria-label="`Goto page ${pagePrev - 1}`" :to="`?_page=${pagePrev - 1}`">{{pagePrev - 1}}</router-link>
    </li>
    <li v-show="page > 1">
      <router-link class="pagination-link" :aria-label="`Goto page ${pagePrev}`" :to="`?_page=${pagePrev}`">{{pagePrev}}</router-link>
    </li>
    <li>
      <a class="pagination-link is-current" :aria-label="`Page ${page}`" aria-current="page" href="javascript:;">{{page}}</a>
    </li>
    <li v-show="page < totalPage">
      <router-link class="pagination-link" :aria-label="`Goto page ${pageNext}`" :to="`?_page=${pageNext}`">{{pageNext}}</router-link>
    </li>
    <li v-show="page < 2 && totalPage > 3">
      <router-link class="pagination-link" :aria-label="`Goto page ${pageNext + 1}`" :to="`?_page=${pageNext + 1}`">{{pageNext + 1}}</router-link>
    </li>
    <li v-show="page < 2 && totalPage > 4">
      <router-link class="pagination-link" :aria-label="`Goto page ${pageNext + 2}`" :to="`?_page=${pageNext + 2}`">{{pageNext + 2}}</router-link>
    </li>
    <li v-show="totalPage > 5 && page < totalPage - 2">
      <span class="pagination-ellipsis">&hellip;</span>
    </li>
    <li v-show="page < totalPage - 1">
      <router-link class="pagination-link" :aria-label="`Goto page ${totalPage}`" :to="`?_page=${totalPage}`">{{totalPage}}</router-link>
    </li>
    <li>
      <router-link class="pagination-link" aria-label="`Goto page ${pageNext}`" :disabled="page == totalPage" :to="`?_page=${pageNext}`">Next</router-link>
    </li>
  </ul>
</nav>
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    page: Number,
    totalPage: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const pagePrev = computed(() => props.page - 1)
    const pageNext = computed(() => props.page + 1)

    return {
      ...props, // 使用展开操作符，props 包含的属性就定义在组件内
      pagePrev,
      pageNext
    }
  }
}

/*
example
最大显示5个页码值，其余的用省略号表示
1
12
123
1234
12345
1234.6 1.3456
1234.7 1.345.7 1.4567
 */
</script>
