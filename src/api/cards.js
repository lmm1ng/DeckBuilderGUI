export default {
  getCards(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}/cards`)
      .then((response) => response.json());
  },
  getCard(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}/cards/${requestData.cardId}`)
      .then((response) => response.json());
  },
  createCard(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}/cards`, { method: 'POST', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
  editCard(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}/cards/${requestData.cardId}`, { method: 'PATCH', body: JSON.stringify(requestData.body) })
      .then((response) => response.json());
  },
  deleteCard(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}/cards/${requestData.cardId}`, { method: 'DELETE' });
  },
};
