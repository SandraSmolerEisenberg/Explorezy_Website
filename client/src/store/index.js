import Vue from 'vue'
import Vuex from 'vuex'

import { account } from './account.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account
  }
})
