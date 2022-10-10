import api from '@/api';

export default {
  state: {
    version: '',
  },
  getters: {
    getVersion(state) {
      return state.version;
    },
  },
  mutations: {
    setVersion(state, payload) {
      state.version = payload;
    },
  },
  actions: {
    fetchCheckStatus() {
      return api.system.checkStatus().then((response) => response.data);
    },
    fetchVersion({ commit }) {
      return api.system.getVersion().then((response) => commit('setVersion', response.data));
    },
  },
};
