import { createStore } from 'vuex'

export interface State {
  data: string[]
}

export default createStore<State>({
  state: {
    data: []
  },
  getters: {
  },
  mutations: {

    Add_Data(state, isAuth: string){
      state.data.push(isAuth);
    },

    Delete_Data(state, data: string){
      state.data = state.data.filter(d=> d !== data);
    }

  },
  actions: {

    isAuthenticated({commit}, data: string){
      commit('Add_Data', data);
   },

   deleteData({commit}, data: string){
     commit('Delete_Data', data);
   }

  },
  modules: {
  }
})
