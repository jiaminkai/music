import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music:[],
    loginchange:{},
    musicindex:0
  },
  mutations: {
    SetMusic(state, payload){
       
       state.music=payload
    },
    loginSuccess(state, payload){
      state.loginchange=payload
    },
    playmusicindex(state, payload){
      state.musicindex=payload
    }
  },
  actions: {
  },
  modules: {

  },
  getters:{
   
  }
})
