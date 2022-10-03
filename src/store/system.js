import api from '@/api';

export default {
  actions: {
    fetchCheckStatus() {
      return api.system.checkStatus().then((response) => response.data);
    },
  },
};
