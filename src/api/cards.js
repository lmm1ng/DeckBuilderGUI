export default {
  getCards(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}/cards`)
      .then((response) => response.json());
  },
  createCard(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}/cards`, { method: 'POST', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
};
