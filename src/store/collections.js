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
    replaceCollection(state, payload) {
      state.collections = state.collections.map((collection) => {
        if (collection.id === payload.oldId) {
          return payload;
        }
        return collection;
      });
    },
    deleteCollection(state, payload) {
      state.collections = state.collections.filter((el) => el.id !== payload.collectionId);
    },
  },
  actions: {
    fetchCollections({ commit }, requestData) {
      return api.collections.getCollections(requestData)
        .then((response) => commit('setCollections', response.data));
    },
    // eslint-disable-next-line no-unused-vars
    fetchCollection({ commit }, requestData) {
      return api.collections.getCollection(requestData)
        .then((response) => response.data);
    },
    fetchAddCollection({ commit }, requestData) {
      return api.collections.createCollection(requestData)
        .then((response) => commit('setAddCollection', response.data));
    },
    fetchEditCollection({ commit }, requestData) {
      return api.collections.editCollection(requestData).then((response) => {
        commit('replaceCollection', { ...response.data, oldId: requestData.collectionId });
      });
    },
    fetchDeleteCollection({ commit }, requestData) {
      return api.collections.deleteCollection(requestData).then(() => {
        commit('deleteCollection', requestData);
      });
    },
  },
};
