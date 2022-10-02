import api from '@/api';

export default {
  state: {
    decks: [],
  },
  getters: {
    getDecks(state) {
      return state.decks;
    },
  },
  mutations: {
    setDecks(state, payload) {
      state.decks = payload;
    },
    setAddDecks(state, payload) {
      state.decks = state.decks.concat([payload]);
    },
  },
  actions: {
    fetchDecks({ commit }, requestData) {
      return api.decks.getDecks(requestData)
        .then((response) => commit('setDecks', response.data));
    },
    fetchAddDeck({ commit }, requestData) {
      return api.decks.createDeck(requestData)
        .then((response) => commit('setAddDecks', response.data));
    },
  },
};
