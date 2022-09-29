import { createStore } from 'vuex';

export default createStore({
  state: {
    games: [
      {
        title: 'Isaac',
        image: 'https://foursouls.com/wp-content/uploads/2022/01/b2-isaac-308x420.png',
      },
      {
        title: 'Isaac',
        image: 'https://foursouls.com/wp-content/uploads/2022/01/b2-isaac-308x420.png',
      },
      {
        title: 'Isaac',
        image: 'https://foursouls.com/wp-content/uploads/2022/01/b2-isaac-308x420.png',
      },
      {
        title: 'Isaac',
        image: 'https://foursouls.com/wp-content/uploads/2022/01/b2-isaac-308x420.png',
      },
      {
        title: 'Isaac',
        image: 'https://foursouls.com/wp-content/uploads/2022/01/b2-isaac-308x420.png',
      },
      {
        title: 'Isaac',
        image: 'https://foursouls.com/wp-content/uploads/2022/01/b2-isaac-308x420.png',
      },
      {
        title: 'Isaac',
        image: 'https://foursouls.com/wp-content/uploads/2022/01/b2-isaac-308x420.png',
      },
      {
        title: 'Isaac',
        image: 'https://foursouls.com/wp-content/uploads/2022/01/b2-isaac-308x420.png',
      },
    ],
  },
  getters: {
    getGames(state) {
      return state.games;
    },
  },
  mutations: {
    setAddGame(state, payload) {
      state.games = state.games.concat([payload]);
    },
  },
  actions: {
    fetchAddGame({ commit }, game) {
      commit('setAddGame', game);
    },
  },
  modules: {
  },
});
