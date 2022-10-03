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
    replaceGame(state, payload) {
      state.games = state.games.map((game) => {
        if (game.id === payload.oldId) {
          return payload;
        }
        return game;
      });
    },
    deleteGame(state, payload) {
      state.games = state.games.filter((el) => el.id !== payload.gameId);
    },
  },
  actions: {
    fetchGames({ commit }) {
      return api.games.getGames().then((response) => commit('setGames', response.data));
    },
    // eslint-disable-next-line no-unused-vars
    fetchGame({ commit }, requestData) {
      return api.games.getGame(requestData)
        .then((response) => response.data);
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
    fetchEditGame({ commit }, requestData) {
      return api.games.editGame(requestData).then((response) => {
        commit('replaceGame', { ...response.data, oldId: requestData.gameId });
      });
    },
    fetchDeleteGame({ commit }, requestData) {
      return api.games.deleteGame(requestData).then(() => {
        commit('deleteGame', requestData);
      });
    },
    fetchDuplicateGame({ commit }, requestData) {
      return api.games.duplicateGame(requestData)
        .then((response) => {
          commit('setAddGame', response.data);
        });
    },
  },
};
