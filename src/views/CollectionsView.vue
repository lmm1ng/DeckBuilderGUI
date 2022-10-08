<template>
  <div class="collections">
    <ui-modal
      v-model:show="isAddModal"
      :title="computedModalTitle"
      @submit="onCollectionSubmit"
    >
      <div class="add-modal">
        <div class="add-modal__inputs">
          <n-input placeholder="Title" v-model:value="collectionModelForm.name"/>
          <n-input placeholder="Image" v-model:value="collectionModelForm.image"/>
          <n-input
            type="textarea"
            placeholder="Description"
            :resizable="false"
            v-model:value="collectionModelForm.description"
          />
        </div>
        <div class="add-modal__preview">
          <img
            v-if="collectionModelForm.image"
            class="collection-preview"
            :src="collectionModelForm.image"
            alt="preview"
          />
          <div class="collection-preview collection-preview--unsetted" v-else></div>
        </div>
      </div>
    </ui-modal>
    <page-header
      title="Collections"
      show-buttons
      createTooltipText="Create collection"
      @on-add="onAdd"
      @on-sort="onSort"
    />
    <page-content>
      <div class="collections__list">
        <card-el
          v-for="collection in collections"
          :key="collection.id"
          :name="collection.name"
          :img="collection.cachedImage"
          :description="collection.description"
          :id="collection.id"
          @cardClick="onCollectionClick"
          @on-edit="onCollectionEdit"
          @on-delete="onCollectionDelete"
        />
      </div>
    </page-content>
  </div>
</template>

<script setup>
import PageHeader from '@/components/layout/PageHeader.vue';
import PageContent from '@/components/layout/PageContent.vue';
import CardEl from '@/components/CardEl.vue';
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import UiModal from '@/components/ui/uiModal.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const fetchCollections = (config = {}) => {
  store.dispatch('fetchCollections', { gameId: route.params.gameId, config });
};

onMounted(() => {
  fetchCollections();
});

onBeforeUnmount(() => {
  store.commit('setCollections', []);
});

const collections = computed(() => store.getters.getCollections);
const isAddModal = ref(false);
const onAdd = () => {
  isAddModal.value = true;
};
const collectionModelForm = ref({
  name: '',
  image: '',
  description: '',
});

const editCollectionId = ref('_');

watch(isAddModal, (val) => {
  if (!val) {
    editCollectionId.value = '_';
    collectionModelForm.value = {
      name: '',
      image: '',
      description: '',
    };
  }
});

const computedModalTitle = computed(() => (editCollectionId.value === '_' ? 'Create collection' : 'Edit collection'));

const onCollectionSubmit = () => {
  const action = editCollectionId.value !== '_' ? 'fetchEditCollection' : 'fetchAddCollection';
  if (collectionModelForm.value.name && collectionModelForm.value.image) {
    store.dispatch(action, {
      gameId: route.params.gameId,
      collectionId: editCollectionId.value,
      body: collectionModelForm.value,
    })
      .finally(() => {
        collectionModelForm.value = { name: '', image: '', description: '' };
        isAddModal.value = false;
      });
  }
};

const onCollectionEdit = (id) => {
  store.dispatch('fetchCollection', {
    gameId: route.params.gameId,
    collectionId: id,
  }).then((response) => {
    collectionModelForm.value = {
      name: response.name,
      image: response.image,
      description: response.description,
    };
    isAddModal.value = true;
    editCollectionId.value = id;
  });
};

const onCollectionDelete = (id) => {
  store.dispatch('fetchDeleteCollection', {
    gameId: route.params.gameId,
    collectionId: id,
  });
};

const onCollectionClick = (id) => {
  router.push(`/game/${route.params.gameId}/collection/${id}`);
};

const onSort = (val) => {
  fetchCollections({ sort: val });
};
</script>

<style lang="scss">
.collections {
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
.add-modal {
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  &__inputs {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  }
  &__preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.collection-preview {
  max-width: 205px;
  border: 2px #138b44 solid;
  border-radius: 8px;
  user-select: none;
  &--unsetted {
    width: 205px;
    aspect-ratio: 0.71;
    background-color: #138b44;
  }
}
</style>
