import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'
import vuetify from './plugins/vuetify'

Vue.prototype.$http = request
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
