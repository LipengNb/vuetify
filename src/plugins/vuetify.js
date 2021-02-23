import Vue from 'vue'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import Vuetify from 'vuetify/lib/framework'
import store from '@/store'
import '../style/index.scss'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  },
  theme: {
    dark: store.state.settings.dark
  }
})
