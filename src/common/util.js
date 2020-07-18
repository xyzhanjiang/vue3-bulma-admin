export function getScrollbarWidth() {
  const el = document.createElement('div')
  el.style.position = 'absolute'
  el.style.top = '-9999px'
  el.style.width = '50px'
  el.style.height = '50px'
  el.style.overflow = 'scroll'
  document.body.appendChild(el)
  const scrollbarWidth = el.getBoundingClientRect().width - el.clientWidth
  document.body.removeChild(el)
  return scrollbarWidth
}
