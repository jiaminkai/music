import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music:[]
  },
  mutations: {
    SetMusic(state, payload){
       console.log("aaa",payload)
       state.music=payload
    }
  },
  actions: {
  },
  modules: {

  },
  getters:{
   
  }
})
