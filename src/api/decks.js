export default {
  getDecks(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks`)
      .then((response) => response.json());
  },
  createDeck(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks`, { method: 'POST', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
};
