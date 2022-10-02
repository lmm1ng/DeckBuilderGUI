import { createStore } from 'vuex';
import games from './games';
import collections from './collections';
import decks from './decks';
import cards from './cards';

export default createStore({
  state: {
    pathItems: [],
  },
  getters: {
    getFullPathItems(state) {
      return state.pathItems;
    },
    getBreadcrumbPathItems(state) {
      return state.pathItems.filter((el, idx) => idx % 2 !== 0);
    },
  },
  mutations: {
    setPathItems(state, payload) {
      state.pathItems = payload.split('/').slice(1);
    },
  },
  modules: {
    games,
    collections,
    decks,
    cards,
  },
});
