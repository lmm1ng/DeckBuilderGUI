import { ICollection, IEntityQuery } from './types/entities'
import { IResponse } from './types/response'
import { ICrudRequest } from './types/entities'

export default {
  list(requestData: ICrudRequest & { config: IEntityQuery }): Promise<IResponse<ICollection[]>> {
    return fetch(
      `/api/games/${requestData.gameId}/collections?${new URLSearchParams(
        requestData.config.toString(),
      )}`,
    ).then(response => response.json())
  },
  read(requestData: ICrudRequest): Promise<IResponse<ICollection>> {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}`).then(
      response => response.json(),
    )
  },
  create(requestData: ICrudRequest & { body: FormData }): Promise<IResponse<ICollection>> {
    return fetch(`/api/games/${requestData.gameId}/collections`, {
      method: 'POST',
      body: requestData.body,
      headers: { ContentType: 'multipart/form-data' },
    }).then(response => response.json())
  },
  update(requestData: ICrudRequest & { body: FormData }): Promise<IResponse<ICollection>> {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}`, {
      method: 'PATCH',
      body: requestData.body,
      headers: { ContentType: 'multipart/form-data' },
    }).then(response => response.json())
  },
  delete(requestData: ICrudRequest) {
    return fetch(`/api/games/${requestData.gameId}/collections/${requestData.collectionId}`, {
      method: 'DELETE',
    })
  },
}
