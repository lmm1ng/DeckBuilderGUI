import { useStore } from '@/stores/main';

// eslint-disable-next-line import/prefer-default-export
export const setBar = (to, from, next) => {
  const mainStore = useStore();
  mainStore.fetchPathItems(to.path);
  next();
};
