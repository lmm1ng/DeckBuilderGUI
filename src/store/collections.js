import api from '@/api';

export default {
  state: {
    collections: [],
  },
  getters: {
    getCollections(state) {
      return state.collections;
    },
  },
  mutations: {
    setCollections(state, payload) {
      state.collections = payload;
    },
    setAddCollection(state, payload) {
      state.collections = state.collections.concat([payload]);
    },
  },
  actions: {
    fetchCollections({ commit }, requestData) {
      return api.collections.getCollections(requestData)
        .then((response) => commit('setCollections', response.data
          .map(((collection) => ({
            ...collection,
            cachedImage: `/api/games/${requestData.gameId}/collections/${collection.id}/image`,
          })))));
    },
    fetchAddCollection({ commit }, requestData) {
      return api.collections.createCollection(requestData)
        .then((response) => commit('setAddCollection', response.data));
    },
  },
};
