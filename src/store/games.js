import api from '@/api';

export default {
  state: {
    games: [],
    isGamesLoading: false,
  },
  getters: {
    getGames(state) {
      return state.games;
    },
    isGamesLoading(state) {
      return state.isGamesLoading;
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
          return { ...payload, cachedImage: `${payload.cachedImage}?${Math.random()}` };
        }
        return game;
      });
    },
    deleteGame(state, payload) {
      state.games = state.games.filter((el) => el.id !== payload.gameId);
    },
    setGamesLoading(state, payload) {
      state.isGamesLoading = payload;
    },
  },
  actions: {
    fetchGames({ commit, rootGetters }, requestData) {
      commit('setGamesLoading', true);
      return api.games.getGames({
        ...requestData,
        config: { sort: rootGetters.getSortValue },
      })
        .then((response) => commit('setGames', response.data))
        .finally(() => commit('setGamesLoading', false));
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
    fetchImportGame({ commit }, requestData) {
      return api.games.importGame(requestData)
        .then((response) => commit('setAddGame', response.data));
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
    // eslint-disable-next-line no-unused-vars
    fetchGenerateGame({ commit }, requestData) {
      return api.games.generateGame(requestData);
    },
  },
};
