import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import settings from './modules/settings'
import globalData from './modules/globalData'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    settings,
    globalData
  }
})
