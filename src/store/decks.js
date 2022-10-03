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
    replaceDeck(state, payload) {
      state.decks = state.decks.map((deck) => {
        if (deck.id === payload.oldId) {
          return payload;
        }
        return deck;
      });
    },
    deleteDeck(state, payload) {
      state.decks = state.decks.filter((el) => el.id !== payload.deckId);
    },
  },
  actions: {
    fetchDecks({ commit }, requestData) {
      return api.decks.getDecks(requestData)
        .then((response) => commit('setDecks', response.data
          .map(((deck) => ({
            ...deck,
            cachedImage: `/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${deck.id}/image`,
          })))));
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
