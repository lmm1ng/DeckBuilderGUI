export default {
  getGames() {
    return fetch('/api/games').then((response) => response.json());
  },
  getGame(requestData) {
    return fetch(`/api/games/${requestData.gameId}`).then((response) => response.json());
  },
  createGame(requestData) {
    return fetch('/api/games', { method: 'POST', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
  editGame(requestData) {
    return fetch(`/api/games/${requestData.gameId}`, { method: 'PATCH', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
  deleteGame(requestData) {
    return fetch(`/api/games/${requestData.gameId}`, { method: 'DELETE' });
  },
  exportGame(requestData) {
    return fetch(`/api/games/${requestData.gameId}/export`);
  },
  importGame(requestData) {
    return fetch('/api/games/import', { method: 'POST', body: requestData, headers: { ContentType: 'multipart/form-data' } });
  },
  duplicateGame(requestData) {
    return fetch(`/api/games/${requestData.gameId}/duplicate`, { method: 'POST', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
  generateGame(requestData) {
    return fetch(`/api/games/${requestData.gameId}/generate`);
  },
};
