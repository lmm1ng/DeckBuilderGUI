import api from '@/api';

export default {
  state: {
    cards: [],
  },
  getters: {
    getCards(state) {
      return state.cards;
    },
  },
  mutations: {
    setCards(state, payload) {
      state.cards = payload;
    },
    setAddCards(state, payload) {
      state.cards = state.cards.concat([payload]);
    },
  },
  actions: {
    fetchCards({ commit }, requestData) {
      return api.cards.getCards(requestData)
        .then((response) => commit('setCards', response.data));
    },
    fetchAddCard({ commit }, requestData) {
      return api.cards.createCard(requestData)
        .then((response) => commit('setAddCards', response.data));
    },
  },
};
