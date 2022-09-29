import { createRouter, createWebHistory } from 'vue-router';
import GamesView from '@/views/GamesView.vue';

const routes = [
  {
    path: '/',
    name: 'Games',
    component: GamesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
