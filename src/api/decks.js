export default {
  getDecks(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks?${new URLSearchParams(requestData.config)}`)
      .then((response) => response.json());
  },
  getDeck(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}`)
      .then((response) => response.json());
  },
  createDeck(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks`, { method: 'POST', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
  editDeck(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}`, { method: 'PATCH', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
  deleteDeck(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}`, { method: 'DELETE' });
  },
};
