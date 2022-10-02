export default {
  getCollections(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections`)
      .then((response) => response.json());
  },
  createCollection(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections`, { method: 'POST', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
};
