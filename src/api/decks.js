export default {
  list(requestData) {
    return fetch(
      `/api/games/${requestData.gameId}/collections/${
        requestData.collectionId
      }/decks?${new URLSearchParams(requestData.config)}`,
    ).then(response => response.json())
  },
  read(requestData) {
    return fetch(
      `/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}`,
    ).then(response => response.json())
  },
  create(requestData) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks`, {
      method: 'POST',
      body: requestData.body,
      headers: { ContentType: 'multipart/form-data' },
    }).then(response => response.json())
  },
  update(requestData) {
    return fetch(
      `/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}`,
      {
        method: 'PATCH',
        body: requestData.body,
        headers: { ContentType: 'multipart/form-data' },
      },
    ).then(response => response.json())
  },
  delete(requestData) {
    return fetch(
      `/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}`,
      { method: 'DELETE' },
    )
  },
}
