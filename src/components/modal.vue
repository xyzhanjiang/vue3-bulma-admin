<template>
<div class="modal modal-fade" ref="modal">
  <slot/>
</div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'

const getScrollbarWidth = () => {
  const div = document.createElement('div')
  div.className = 'modal-scrollbar-measure'
  document.body.appendChild(div)
  const scrollbarWidth = div.getBoundingClientRect().width - div.clientWidth
  document.body.removeChild(div)
  return scrollbarWidth
}

const scrollbarWidth = getScrollbarWidth()

const props = defineProps({
  isShown: Boolean
})

const modal = ref(null)

// Modal 框激活的时候禁用 <html> 滚动条，防止背景滚动
// .is-clipped { overflow: hidden; }
// 给 <body> 添加 padding-right 占位，防止背景抖动
watchEffect(() => {
  document.documentElement.classList[props.isShown ? 'add' : 'remove']('is-clipped')

  const style = document.documentElement.style
  if (props.isShown) {
    style.paddingRight = scrollbarWidth + 'px'
  } else {
    style.removeProperty('padding-right')
  }
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
</script>
