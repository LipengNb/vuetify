export function debounce(func, wait, immediate) {
  let timeout
  return function(...args) {
    const _this = this
    if (timeout) clearTimeout(timeout)

    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) func.apply(_this, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(_this, args)
      }, wait)
    }
  }
}