import { createApp } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import naive from 'naive-ui';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(naive)
  .use(pinia)
  .mount('#app');
