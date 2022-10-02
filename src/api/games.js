export default {
  getGames() {
    return fetch('/api/games').then((response) => response.json());
  },
  getGame(requestData) {
    return fetch(`/api/games/${requestData.gameId}`).then((response) => response.json());
  },
  createGame(requestData) {
    return fetch('/api/games', { method: 'POST', body: JSON.stringify(requestData) })
      .then((response) => response.json());
  },
  exportGame(requestData) {
    return fetch(`/api/games/${requestData.gameId}/export`);
  },
  importGame(requestData) {
    return fetch('/api/games/import', { method: 'POST', body: requestData, headers: { ContentType: 'multipart/form-data' } });
  },
};
