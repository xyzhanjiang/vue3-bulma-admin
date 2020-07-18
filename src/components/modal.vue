<template>
<div class="modal" :class="{'is-active': isShown}">
  <slot/>
</div>
</template>

<script>
import { watchEffect } from 'vue'

export default {
  props: {
    isShown: Boolean
  },
  setup(props) {
    // Modal 框激活的时候禁用 <html> 滚动条，防止背景滚动
    // .is-clipped { overflow: hidden; }
    // TODO 添加 padding 占位
    watchEffect(() => {
      // TODO optional classList polyfill
      document.documentElement.classList[props.isShown ? 'add' : 'remove']('is-clipped')
    })
  }
}
</script>
