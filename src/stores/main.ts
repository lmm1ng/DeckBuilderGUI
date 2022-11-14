import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Sort } from '@/api/games'
import api from '@/api'

export type ItemType = 'games' | 'collections' | 'decks' | 'cards'

export const useStore = defineStore('main', () => {
  const itemType = ref<ItemType>('games')
  const sort = ref<Sort>('name')
  const search = ref<string>('')

  const breadcrumbPathItems = ref<string[]>([])
  const pathItems = ref<string[]>([])

  function setItemType(type: ItemType) {
    itemType.value = type
  }

  function setSort(val: Sort) {
    sort.value = val
  }

  function setSearch(val: string) {
    search.value = val
  }

  function setPathItems(val: string[]) {
    pathItems.value = val
  }

  async function fetchPathItems(path: string) {
    const prepPath = path.split('/').slice(1)
    setPathItems(prepPath)
    const onlyIds = prepPath.filter((el, idx) => idx % 2 !== 0)
    breadcrumbPathItems.value = await Promise.all(
      onlyIds.map((pathEl, idx, arr) => {
        switch (idx) {
          case 0:
            return api.games.read({ gameId: arr[0] }).then(response => response.data.name)
          case 1:
            return api.collections
              .read({
                gameId: arr[0],
                collectionId: arr[1],
              })
              .then(response => response.data.name)
          case 2:
            return api.decks
              .read({
                gameId: arr[0],
                collectionId: arr[1],
                deckId: arr[2],
              })
              .then(response => response.data.name)
          case 3:
            return api.cards
              .read({
                gameId: arr[0],
                collectionId: arr[1],
                deckId: arr[2],
                cardId: arr[3],
              })
              .then(response => response.data.name)
          default:
            return 'unknown'
        }
      }),
    )
  }

  return {
    itemType,
    sort,
    setItemType,
    breadcrumbPathItems,
    pathItems,
    fetchPathItems,
    setSort,
    setPathItems,
    search,
    setSearch,
  }
})
