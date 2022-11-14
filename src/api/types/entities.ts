interface IEntity {
  id: string
  name: string
  description: string
  image: string
  cachedImage: string
  createdAt: string
  updatedAt: string
}

export interface IGame extends IEntity {}

export interface ICollection extends IEntity {}

export interface IDeck extends IEntity {}

export interface ICard extends IEntity {
  count: number
  variables: Array<Record<string, string>>
}

export interface IEntityQuery {
  sort?: string
  search?: string
}

export interface ICrudRequest {
  gameId?: string
  collectionId?: string
  deckId?: string
  cardId?: string
}
