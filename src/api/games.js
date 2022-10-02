export default {
  getGames() {
    return fetch('/api/games').then((response) => response.json());
  },
  createGame(requestData) {
    return fetch('/api/games', { method: 'POST', body: JSON.stringify(requestData) })
      .then((response) => response.json());
  },
};
