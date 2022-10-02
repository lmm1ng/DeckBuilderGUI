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
    // eslint-disable-next-line no-unused-vars
    fetchExportGame({ commit }, requestData) {
      return api.games.exportGame(requestData).then((response) => {
        response.blob().then((data) => {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(data);
          a.download = `${requestData.gameId}.zip`;
          a.click();
        });
      });
    },
    // eslint-disable-next-line no-unused-vars
    fetchImportGame({ commit }, requestData) {
      return api.games.importGame(requestData);
    },
  },
};
