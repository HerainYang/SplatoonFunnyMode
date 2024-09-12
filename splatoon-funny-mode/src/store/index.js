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
      localStorage.setItem('roomID', input.roomID);
      localStorage.setItem('ID', input.id);
    },
    updateToken(state, input) {
      state.user.token = input;
      localStorage.setItem('token', input);
    },
    updateAdminStatus(state, input) {
      state.user.is_admin = input;
      localStorage.setItem('is_admin', input);
    }
  },
  getters: {
    getUserAdminStatus(state) {
      if(!state.user.is_admin) {
        state.user.is_admin = localStorage.getItem('is_admin');
      }
      return state.user.is_admin;
    },
    getUserToken(state) {
      if(!state.user.token) {
        state.user.token = localStorage.getItem('token');
      }
      return state.user.token;
    },
    getUserRoomID(state) {
      if(!state.user.roomID) {
        state.user.roomID = localStorage.getItem('roomID');
      }
      return state.user.roomID;
    }
  }
})
