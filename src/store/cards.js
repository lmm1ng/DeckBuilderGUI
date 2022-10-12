import api from '@/api';

export default {
  state: {
    cards: [],
    isCardsLoading: false,
  },
  getters: {
    getCards(state) {
      return state.cards;
    },
    isCardsLoading(state) {
      return state.isCardsLoading;
    },
  },
  mutations: {
    setCards(state, payload) {
      state.cards = payload;
    },
    setAddCards(state, payload) {
      state.cards = state.cards.concat([payload]);
    },
    replaceCard(state, payload) {
      state.cards = state.cards.map((card) => {
        if (card.id === payload.id) {
          return { ...payload, cachedImage: `${payload.cachedImage}?${Math.random()}` };
        }
        return card;
      });
    },
    deleteCard(state, payload) {
      state.cards = state.cards.filter((el) => String(el.id) !== payload.cardId);
    },
    setCardsLoading(state, payload) {
      state.isCardsLoading = payload;
    },
  },
  actions: {
    fetchCards({ commit, rootGetters }, requestData) {
      commit('setCardsLoading', true);
      return api.cards.getCards({
        ...requestData,
        config: { sort: rootGetters.getSortValue },
      })
        .then((response) => commit('setCards', response.data))
        .finally(() => commit('setCardsLoading', false));
    },
    // eslint-disable-next-line no-unused-vars
    fetchCard({ commit }, requestData) {
      return api.cards.getCard(requestData)
        .then((response) => response.data);
    },
    fetchAddCard({ commit }, requestData) {
      return api.cards.createCard(requestData)
        .then((response) => commit('setAddCards', response.data));
    },
    fetchEditCard({ commit }, requestData) {
      return api.cards.editCard(requestData).then((response) => {
        commit('replaceCard', response.data);
      });
    },
    fetchDeleteCard({ commit }, requestData) {
      return api.cards.deleteCard(requestData).then(() => {
        commit('deleteCard', requestData);
      });
    },
  },
};
