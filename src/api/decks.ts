import { IDeck, IEntityQuery } from './types/entities'
import { IResponse } from './types/response'
import { ICrudRequest } from './types/entities'

export default {
  list(requestData: ICrudRequest & { config: IEntityQuery }): Promise<IResponse<IDeck[]>> {
    return fetch(
      `/api/games/${requestData.gameId}/collections/${
        requestData.collectionId
      }/decks?${new URLSearchParams(requestData.config.toString())}`,
    ).then(response => response.json())
  },
  read(requestData: ICrudRequest): Promise<IResponse<IDeck>> {
    return fetch(
      `/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}`,
    ).then(response => response.json())
  },
  create(requestData: ICrudRequest & { body: FormData }): Promise<IResponse<IDeck>> {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks`, {
      method: 'POST',
      body: requestData.body,
      headers: { ContentType: 'multipart/form-data' },
    }).then(response => response.json())
  },
  update(requestData: ICrudRequest & { body: FormData }): Promise<IResponse<IDeck>> {
    return fetch(
      `/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}`,
      {
        method: 'PATCH',
        body: requestData.body,
        headers: { ContentType: 'multipart/form-data' },
      },
    ).then(response => response.json())
  },
  delete(requestData: ICrudRequest) {
    return fetch(
      `/api/games/${requestData.gameId}/collections/${requestData.collectionId}/decks/${requestData.deckId}`,
      { method: 'DELETE' },
    )
  },
}
