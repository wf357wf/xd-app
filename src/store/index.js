import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    lists: []
  },
  mutations: {
    increase () {
      this.state.count++
    },
    addItem (state, value) {
      state.lists.push(value)
    }
  },
  actions: {
  },
  modules: {
  }
})
