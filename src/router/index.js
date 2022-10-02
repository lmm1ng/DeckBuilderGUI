import { createRouter, createWebHistory } from 'vue-router';
import GamesView from '@/views/GamesView.vue';
import CollectionsView from '@/views/CollectionsView.vue';
import DecksView from '@/views/DecksView.vue';
import CardsView from '@/views/CardsView.vue';

import { setBar } from './hooks';

const routes = [
  {
    path: '/',
    name: 'Games',
    beforeEnter: setBar,
    component: GamesView,
  },
  {
    path: '/game/:gameId',
    name: 'Collections',
    beforeEnter: setBar,
    component: CollectionsView,
  },
  {
    path: '/game/:gameId/collection/:collectionId',
    name: 'Decks',
    beforeEnter: setBar,
    component: DecksView,
  },
  {
    path: '/game/:gameId/collection/:collectionId/deck/:deckId',
    name: 'Cards',
    beforeEnter: setBar,
    component: CardsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
