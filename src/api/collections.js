export default {
  getCollections(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections?${new URLSearchParams(requestData.config)}`)
      .then((response) => response.json());
  },
  getCollection(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}`)
      .then((response) => response.json());
  },
  createCollection(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections`, { method: 'POST', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
  editCollection(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}`, { method: 'PATCH', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
  deleteCollection(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}`, { method: 'DELETE' });
  },
};
