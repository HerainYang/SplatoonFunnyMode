import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      user: {
        ID: '',
        roomID: '',
        token: '',
        is_admin: false
      }
    }
  },
  mutations: {
    updatePersonalInfo(state, input) {
      state.user.ID = input.id;
      state.user.roomID = input.roomID;
    },
    updateToken(state, input) {
      state.user.token = input;
    },
    updateAdminStatus(state, input) {
      state.user.is_admin = input;
    }
  }
})
