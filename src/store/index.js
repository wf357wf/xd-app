import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    lists: []
  },
  mutations: {
    increase (state, value) {
      state.lists = value
    },
    addItem (state, value) {
      state.lists.push(value)
    },
    delItem (state, index) {
      state.lists.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
