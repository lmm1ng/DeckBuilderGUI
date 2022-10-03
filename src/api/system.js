export default {
  quit() {
    return fetch('/api/system/quit', { method: 'DELETE' });
  },
};
