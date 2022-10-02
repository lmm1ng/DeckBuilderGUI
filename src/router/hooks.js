import store from '@/store';

// eslint-disable-next-line import/prefer-default-export
export const setBar = (to, from, next) => {
  store.dispatch('fetchPathItems', to.path);
  next();
};
