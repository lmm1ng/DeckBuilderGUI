import { createStore } from 'vuex';
import api from '@/api';
import games from './games';
import collections from './collections';
import decks from './decks';
import cards from './cards';
import system from './system';

export default createStore({
  state: {
    pathItems: [],
    breadcrumbPathItems: [],
    sortValue: 'name',
  },
  getters: {
    getFullPathItems(state) {
      return state.pathItems;
    },
    getBreadcrumbPathItems(state) {
      return state.breadcrumbPathItems;
    },
    getSortValue(state) {
      return state.sortValue;
    },
  },
  actions: {
    async fetchPathItems({ commit }, path) {
      const prepPath = path.split('/').slice(1);
      commit('setPathItems', prepPath);
      const onlyIds = prepPath.filter((el, idx) => idx % 2 !== 0);
      const labeledPath = await Promise.all(onlyIds.map((pathEl, idx, arr) => {
        switch (idx) {
          case 0:
            return api.games.getGame({ gameId: arr[0] })
              .then((response) => response.data.name);
          case 1:
            return api.collections.getCollection({ gameId: arr[0], collectionId: arr[1] })
              .then((response) => response.data.name);
          case 2:
            return api.decks.getDeck({ gameId: arr[0], collectionId: arr[1], deckId: arr[2] })
              .then((response) => response.data.name);
          case 3:
            return api.cards.getCard({
              gameId: arr[0],
              collectionId: arr[1],
              deckId: arr[2],
              cardId: arr[3],
            })
              .then((response) => response.data.name);
          default:
            return 'unknown';
        }
      }));
      commit('setBreadcrumbPathItems', labeledPath);
    },
  },
  mutations: {
    setPathItems(state, payload) {
      state.pathItems = payload;
    },
    setBreadcrumbPathItems(state, payload) {
      state.breadcrumbPathItems = payload;
    },
    setSortValue(state, payload) {
      state.sortValue = payload;
    },
  },
  modules: {
    games,
    collections,
    decks,
    cards,
    system,
  },
});
