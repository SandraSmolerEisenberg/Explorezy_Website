import Vue from 'vue'
import Vuex from 'vuex'

import { account } from './account.model'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account
  }
})
