import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/api';
import { useStore } from '@/stores/main';

// eslint-disable-next-line import/prefer-default-export
export const useItemsStore = defineStore('items', () => {
  const mainStore = useStore();

  const items = ref([]);
  const isItemsLoading = ref(false);

  function fetchItems(requestData) {
    isItemsLoading.value = true;
    return api[mainStore.itemType].list({ ...requestData, config: { sort: mainStore.sort } })
      .then((response) => { items.value = response.data; })
      .finally(() => { isItemsLoading.value = false; });
  }

  function fetchItem(requestData) {
    return api[mainStore.itemType].read(requestData)
      .then((response) => response.data);
  }

  const addItem = (payload) => {
    items.value = items.value.concat([payload]);
  };

  const replaceItem = (payload) => {
    items.value = items.value.map((item) => {
      if (item.id === payload.oldId) {
        return { ...payload, cachedImage: `${payload.cachedImage}?${Math.random()}` };
      }
      return item;
    });
  };

  function clearItems() {
    items.value = [];
  }

  const deleteItem = (payload) => {
    items.value = items.value.filter((el) => String(el.id) !== payload.id);
  };

  function fetchCreateItem(requestData) {
    return api[mainStore.itemType].create(requestData)
      .then((response) => addItem(response.data));
  }

  function fetchEditItem(requestData) {
    return api[mainStore.itemType].update(requestData)
      .then((response) => replaceItem({ ...response.data, oldId: requestData.id }));
  }

  function fetchDeleteItem(requestData) {
    return api[mainStore.itemType].delete(requestData)
      .then(() => deleteItem(requestData));
  }

  function fetchImportGame(requestData) {
    return api.games.import(requestData).then((response) => addItem(response.data));
  }

  function fetchExportGame(requestData) {
    return api.games.export(requestData).then((response) => {
      response.blob().then((data) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(data);
        a.download = `${requestData.gameId}.zip`;
        a.click();
      });
    });
  }

  function fetchDuplicateGame(requestData) {
    return api.games.duplicate(requestData).then((response) => addItem(response.data));
  }

  function fetchGenerateGame(requestData) {
    return api.games.generate(requestData);
  }

  return {
    items,
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
  };
});
