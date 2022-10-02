import { createStore } from 'vuex';
import games from './games';
import collections from './collections';
import decks from './decks';
import cards from './cards';

export default createStore({
  modules: {
    games,
    collections,
    decks,
    cards,
  },
});
