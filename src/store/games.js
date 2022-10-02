import api from '@/api';

export default {
  state: {
    games: [],
  },
  getters: {
    getGames(state) {
      return state.games;
    },
  },
  mutations: {
    setGames(state, payload) {
      state.games = payload;
    },
    setAddGame(state, payload) {
      state.games = state.games.concat([payload]);
    },
  },
  actions: {
    fetchGames({ commit }) {
      return api.games.getGames().then((response) => commit('setGames', response.data));
    },
    fetchAddGame({ commit }, game) {
      return api.games.createGame(game).then((response) => commit('setAddGame', response.data));
    },
  },
};
