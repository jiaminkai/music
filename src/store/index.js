import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music:[],
    loginchange:{}
  },
  mutations: {
    SetMusic(state, payload){
       
       state.music=payload
    },
    loginSuccess(state, payload){
      state.loginchange=payload
    }
  },
  actions: {
  },
  modules: {

  },
  getters:{
   
  }
})
