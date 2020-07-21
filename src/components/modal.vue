<template>
<div class="modal modal-fade" ref="modal">
  <slot/>
</div>
</template>

<script>
import { ref, watch, watchEffect } from 'vue'

export default {
  props: {
    isShown: Boolean
  },
  // 不要解构 props，否则会失去响应性
  setup(props) {
    const modal = ref(null)

    // Modal 框激活的时候禁用 <html> 滚动条，防止背景滚动
    // .is-clipped { overflow: hidden; }
    // TODO 给 <body> 添加 padding-right 占位，防止抖动
    watchEffect(() => {
      // TODO optional classList polyfill
      document.documentElement.classList[props.isShown ? 'add' : 'remove']('is-clipped')
    })

    watch(() => props.isShown, (val) => {
      if (val) {
        modal.value.classList.add('is-active')
        modal.value.offsetWidth
        modal.value.classList.add('is-in')
      } else {
        modal.value.addEventListener('transitionend', () => {
          modal.value.classList.remove('is-active')
        }, { once: true })
        modal.value.classList.remove('is-in')
      }
    })

    return {
      modal
    }
  }
}
</script>
