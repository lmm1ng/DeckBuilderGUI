import api from '@/api';

export default {
  state: {
    collections: [],
    isCollectionsLoading: false,
  },
  getters: {
    getCollections(state) {
      return state.collections;
    },
    isCollectionsLoading(state) {
      return state.isCollectionsLoading;
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
          return { ...payload, cachedImage: `${payload.cachedImage}?${Math.random()}` };
        }
        return collection;
      });
    },
    deleteCollection(state, payload) {
      state.collections = state.collections.filter((el) => el.id !== payload.collectionId);
    },
    setCollectionsLoading(state, payload) {
      state.isCollectionsLoading = payload;
    },
  },
  actions: {
    fetchCollections({ commit, rootGetters }, requestData) {
      commit('setCollectionsLoading', true);
      return api.collections.getCollections({
        ...requestData,
        config: { sort: rootGetters.getSortValue },
      })
        .then((response) => commit('setCollections', response.data))
        .finally(() => commit('setCollectionsLoading', false));
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
