import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'
import { useStore } from '@/stores/main'
import { ICard, ICollection, IDeck, IGame } from '@/api/types/entities'
import { IResponse } from '@/api/types/response'
import { ICrudRequest } from '@/api/types/entities'
import { Sort } from '@/api/games'

type ItemsUnion = IGame[] | ICollection[] | IDeck[] | ICard[]
type ItemUnion = IGame | ICollection | IDeck | ICard

export const useItemsStore = defineStore('items', () => {
  const mainStore = useStore()

  const items = ref<ItemsUnion>([])
  const itemsMeta = ref<IResponse<ItemsUnion>['meta']>({})
  const isItemsLoading = ref(false)
  const isApiPending = ref(false)

  function fetchItems(requestData: ICrudRequest) {
    isItemsLoading.value = true
    return api[mainStore.itemType]
      .list({
        ...requestData,
        config: { sort: mainStore.sort, search: mainStore.search },
      })
      .then(response => {
        items.value = response.data
        itemsMeta.value = response.meta
      })
      .finally(() => {
        isItemsLoading.value = false
      })
  }

  function fetchItem(requestData: ICrudRequest) {
    return api[mainStore.itemType].read(requestData).then(response => response.data)
  }

  const addItem = <T extends ItemUnion>(payload: T) => {
    items.value = (items.value as T[]).concat([
      { ...payload, cachedImage: `${payload.cachedImage}?${Math.random()}` },
    ])
    if (itemsMeta.value?.total) {
      itemsMeta.value.total += 1
    }
  }

  const replaceItem = (payload: ItemUnion & { oldId: string }) => {
    items.value = items.value.map(item => {
      if (item.id === payload.oldId) {
        return { ...payload, cachedImage: `${payload.cachedImage}?${Math.random()}` }
      }
      return item
    })
  }

  function clearItems() {
    items.value = []
    itemsMeta.value = {}
  }

  const deleteItem = (id: string) => {
    items.value = items.value.filter(el => String(el.id) !== id)
    if (itemsMeta.value?.total) {
      itemsMeta.value.total -= 1
    }
  }

  function fetchCreateItem(requestData: ICrudRequest & { body: FormData }) {
    isApiPending.value = true
    return api[mainStore.itemType]
      .create(requestData)
      .then(response => addItem(response.data))
      .finally(() => {
        isApiPending.value = false
      })
  }

  function fetchEditItem(requestData: ICrudRequest & { body: FormData; id: string }) {
    isApiPending.value = true
    return api[mainStore.itemType]
      .update(requestData)
      .then(response => replaceItem({ ...response.data, oldId: requestData.id }))
      .finally(() => {
        isApiPending.value = false
      })
  }

  function fetchDeleteItem(requestData: ICrudRequest & { id: string }) {
    return api[mainStore.itemType].delete(requestData).then(() => deleteItem(requestData.id))
  }

  function fetchImportGame(requestData: FormData) {
    isApiPending.value = true
    return api.games
      .import(requestData)
      .then(response => addItem(response.data))
      .finally(() => {
        isApiPending.value = false
      })
  }

  function fetchExportGame(requestData: { gameId: string }) {
    return api.games.export(requestData).then(response => {
      response.blob().then(data => {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(data)
        a.download = `${requestData.gameId}.zip`
        a.click()
      })
    })
  }

  function fetchDuplicateGame(requestData: ICrudRequest & { body: { name: string } }) {
    return api.games.duplicate(requestData).then(response => addItem(response.data))
  }

  function fetchGenerateGame(requestData: ICrudRequest & { body: { sortOrder: Sort } }) {
    return api.games.generate({ ...requestData, body: { sortOrder: mainStore.sort } })
  }

  return {
    items,
    itemsMeta,
    isItemsLoading,
    clearItems,
    fetchItems,
    fetchItem,
    fetchCreateItem,
    fetchEditItem,
    fetchDeleteItem,

    fetchImportGame,
    fetchExportGame,
    fetchDuplicateGame,
    fetchGenerateGame,
    isApiPending,
  }
})
