<template>
  <div class="main">
    <add-modal
      v-model:show="isAddModal"
      :initial-data="tempItem"
      title="Title"
      :count="mainStore.itemType === 'cards'"
      :variables="mainStore.itemType === 'cards'"
      @submit="onAdd"
    />
    <import-modal
      v-model:show="isImportModal"
      @submit="onImport"
    />
    <duplicate-modal
      v-model:show="isDuplicateModal"
      :entity-data="tempItem"
      @submit="onDuplicate"
    />
    <page-header
      show-buttons
      createTooltipText="Create game"
      @on-add="openAddModal"
      @on-import="isImportModal = true"
      @on-sort="onSort"
      :with-import="mainStore.itemType === 'games'"
    />
    <page-content>
      <transition-group name="slide-fade">
        <div v-if="items.length" class="main__list">
          <card-el
            v-for="item in items"
            :id="String(item.id)"
            :key="item.id"
            :name="item.name"
            :img="item.cachedImage"
            :description="item.description"
            :clickable="mainStore.itemType !== 'cards'"
            @card-click="onItemClick"
            :with-export="mainStore.itemType === 'games'"
            @on-export="onExport"
            :with-duplicate="mainStore.itemType === 'games'"
            @on-duplicate="openDuplicateModal"
            :with-render="mainStore.itemType === 'games'"
            @on-render="onGenerate"
            @on-edit="openAddModal"
            @on-delete="onDeleteItem"
          />
        </div>
      </transition-group>
      <div v-if="!items.length && !isItemsLoading" class="empty-filler">
        There is no items
      </div>
    </page-content>
    <div class="render-spinner" v-if="generateProgress">
      <n-progress
        class="render-spinner__progress"
        type="circle"
        color="#169747"
        :percentage="generateProgress"
      />
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  watch,
  onBeforeUnmount,
} from 'vue';
import { useItemsStore } from '@/stores/items';
import { useStore } from '@/stores/main';
import { useSystemStore } from '@/stores/system';
import { useRouter, useRoute } from 'vue-router';

import PageHeader from '@/components/layout/PageHeader.vue';
import PageContent from '@/components/layout/PageContent.vue';
import AddModal from '@/components/modals/AddModal.vue';
import DuplicateModal from '@/components/modals/DuplicateModal.vue';
import ImportModal from '@/components/modals/ImportModal.vue';
import CardEl from '@/components/CardEl.vue';

const router = useRouter();
const route = useRoute();

const itemsStore = useItemsStore();
const mainStore = useStore();
const systemStore = useSystemStore();

const isAddModal = ref(false);
const isImportModal = ref(false);
const isDuplicateModal = ref(false);

const items = computed(() => itemsStore.items);
const isItemsLoading = computed(() => itemsStore.isItemsLoading);

const tempItem = ref({});

onMounted(() => {
  mainStore.setItemType(route.name);
  itemsStore.fetchItems({ ...route.params });
});

watch(isAddModal, (val) => {
  if (!val) {
    tempItem.value = {};
  }
});

watch(isDuplicateModal, (val) => {
  if (!val) {
    tempItem.value = {};
  }
});

const currentPathId = computed(() => {
  let thisId;

  switch (mainStore.itemType) {
    case 'games':
      thisId = 'gameId';
      break;
    case 'collections':
      thisId = 'collectionId';
      break;
    case 'decks':
      thisId = 'deckId';
      break;
    case 'cards':
      thisId = 'cardId';
      break;
    default:
      thisId = undefined;
  }
  return thisId;
});

const openAddModal = (id) => {
  if (id) {
    itemsStore.fetchItem({ ...route.params, [currentPathId.value]: id }).then((response) => {
      tempItem.value = response;
      isAddModal.value = true;
    });
  } else {
    isAddModal.value = true;
  }
};

const onAdd = ({ mode, data }) => {
  const action = mode === 'add' ? itemsStore.fetchCreateItem : itemsStore.fetchEditItem;
  action({
    body: data,
    ...route.params,
    [currentPathId.value]: tempItem.value?.id,
    id: tempItem.value?.id,
  })
    .finally(() => {
      isAddModal.value = false;
    });
};

const openDuplicateModal = (id) => {
  itemsStore.fetchItem({ [currentPathId.value]: id }).then((response) => {
    tempItem.value = response;
    isDuplicateModal.value = true;
  });
};

const onDuplicate = (name) => {
  itemsStore.fetchDuplicateGame({ [currentPathId.value]: tempItem.value.id, body: { name } })
    .finally(() => {
      isDuplicateModal.value = false;
    });
};

const onDeleteItem = (id) => {
  itemsStore.fetchDeleteItem({ ...route.params, [currentPathId.value]: id, id });
};

const onImport = (data) => {
  itemsStore.fetchImportGame(data).then(() => {
    isImportModal.value = false;
  });
};

const onExport = (id) => {
  itemsStore.fetchExportGame({ [currentPathId.value]: id });
};

const generateInterval = ref(null);
const generateProgress = ref(0);

const onGenerate = (id) => {
  itemsStore.fetchGenerateGame({ [currentPathId.value]: id }).then(() => {
    generateInterval.value = setInterval(() => {
      systemStore.fetchCheckStatus().then((status) => {
        generateProgress.value = Math.floor(status.progress);
        if (status.status !== 'in_progress') {
          clearInterval(generateInterval.value);
          setTimeout(() => {
            generateProgress.value = 0;
          }, 500);
        }
      });
    }, 500);
  });
};

const onSort = () => {
  itemsStore.fetchItems({ ...route.params });
};

const onItemClick = (id) => {
  router.push(`${route.fullPath}/${mainStore.itemType}/${id}`
    .replace('//', '/'));
};

onBeforeUnmount(() => {
  itemsStore.clearItems();
});

</script>

<style lang="scss">
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
}

.render-spinner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(227, 222, 214, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
