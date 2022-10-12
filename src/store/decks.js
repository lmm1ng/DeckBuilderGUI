import api from '@/api';

export default {
  state: {
    decks: [],
    isDecksLoading: false,
  },
  getters: {
    getDecks(state) {
      return state.decks;
    },
    isDecksLoading(state) {
      return state.isDecksLoading;
    },
  },
  mutations: {
    setDecks(state, payload) {
      state.decks = payload;
    },
    setAddDecks(state, payload) {
      state.decks = state.decks.concat([payload]);
    },
    replaceDeck(state, payload) {
      state.decks = state.decks.map((deck) => {
        if (deck.id === payload.oldId) {
          return { ...payload, cachedImage: `${payload.cachedImage}?${Math.random()}` };
        }
        return deck;
      });
    },
    deleteDeck(state, payload) {
      state.decks = state.decks.filter((el) => el.id !== payload.deckId);
    },
    setDecksLoading(state, payload) {
      state.isDecksLoading = payload;
    },
  },
  actions: {
    fetchDecks({ commit, rootGetters }, requestData) {
      commit('setDecksLoading', true);
      return api.decks.getDecks({
        ...requestData,
        config: { sort: rootGetters.getSortValue },
      })
        .then((response) => commit('setDecks', response.data))
        .finally(() => commit('setDecksLoading', false));
    },
    // eslint-disable-next-line no-unused-vars
    fetchDeck({ commit }, requestData) {
      return api.decks.getDeck(requestData)
        .then((response) => response.data);
    },
    fetchAddDeck({ commit }, requestData) {
      return api.decks.createDeck(requestData)
        .then((response) => commit('setAddDecks', response.data));
    },
    fetchEditDeck({ commit }, requestData) {
      return api.decks.editDeck(requestData).then((response) => {
        commit('replaceDeck', { ...response.data, oldId: requestData.deckId });
      });
    },
    fetchDeleteDeck({ commit }, requestData) {
      return api.decks.deleteDeck(requestData).then(() => {
        commit('deleteDeck', requestData);
      });
    },
  },
};
