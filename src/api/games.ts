import { IEntityQuery, IGame } from './types/entities'
import { IResponse } from './types/response'
import { ICrudRequest } from './types/entities'

export type Sort = 'name' | 'name_desc' | 'created' | 'created_desc'

export default {
  list(requestData: ICrudRequest & { config: IEntityQuery }): Promise<IResponse<IGame[]>> {
    return fetch(`/api/games?${new URLSearchParams(requestData.config.toString())}`).then(
      response => response.json(),
    )
  },
  read(requestData: ICrudRequest): Promise<IResponse<IGame>> {
    return fetch(`/api/games/${requestData.gameId}`).then(response => response.json())
  },
  create(requestData: ICrudRequest & { body: FormData }): Promise<IResponse<IGame>> {
    return fetch('/api/games', {
      method: 'POST',
      body: requestData.body,
      headers: { ContentType: 'multipart/form-data' },
    }).then(response => response.json())
  },
  update(requestData: ICrudRequest & { body: FormData }): Promise<IResponse<IGame>> {
    return fetch(`/api/games/${requestData.gameId}`, {
      method: 'PATCH',
      body: requestData.body,
      headers: { ContentType: 'multipart/form-data' },
    }).then(response => response.json())
  },
  delete(requestData: ICrudRequest) {
    return fetch(`/api/games/${requestData.gameId}`, { method: 'DELETE' })
  },
  export(requestData: ICrudRequest) {
    return fetch(`/api/games/${requestData.gameId}/export`)
  },
  import(requestData: FormData) {
    return fetch('/api/games/import', {
      method: 'POST',
      body: requestData,
      headers: { ContentType: 'multipart/form-data' },
    }).then(response => response.json())
  },
  duplicate(requestData: ICrudRequest & { body: { name: string } }) {
    return fetch(`/api/games/${requestData.gameId}/duplicate`, {
      method: 'POST',
      body: JSON.stringify(requestData.body),
    }).then(response => response.json())
  },
  generate(requestData: ICrudRequest & { body: { sortOrder: Sort } }) {
    return fetch(`/api/games/${requestData.gameId}/generate`, {
      method: 'POST',
      body: JSON.stringify(requestData.body),
    })
  },
}
