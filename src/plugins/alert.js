import Vue from 'vue'
import AlertTemplate from '@c/alert/'

const AlertBox = Vue.extend(AlertTemplate)

let instance
let timer = null

const Alert = (option = {}) => {
  if (Vue.prototype.$isServer) return

  if (timer) return

  if (typeof option === 'string') {
    option = {
      message: option
    }
  }

  instance = new AlertBox({
    data: option
  })

  instance.vm = instance.$mount()
  const application = document.querySelector('#app')
  application.appendChild(instance.vm.$el)
  instance.vm.visible = true
  timer = setTimeout(() => {
    instance.vm.$destroy()
    instance.vm.$el.parentNode.removeChild(instance.vm.$el)
    timer = null
  }, instance.vm.duration || 1500)

  return instance.vm
}

export default {
  alert: Alert,
  install(Vue) {
    Vue.prototype.$alert = Alert
    Vue.alert = Alert
  }
}
