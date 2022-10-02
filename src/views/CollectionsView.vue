<template>
  <div class="collections">
    <ui-modal
      v-model:show="isAddModal"
      @submit="onCollectionAdd"
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
      @on-add="onAdd"
    />
    <page-content>
      <div class="collections__list">
        <card-el
          v-for="collection in collections"
          :key="collection.id"
          :name="collection.name"
          :img="collection.image"
          :id="collection.id"
          @cardClick="onCollectionClick"
        />
      </div>
    </page-content>
  </div>
</template>

<script setup>
import PageHeader from '@/components/layout/PageHeader.vue';
import PageContent from '@/components/layout/PageContent.vue';
import CardEl from '@/components/CardEl.vue';
import { computed, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import UiModal from '@/components/ui/uiModal.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  store.dispatch('fetchCollections', { gameId: route.params.gameId });
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

const onCollectionAdd = () => {
  if (collectionModelForm.value.name && collectionModelForm.value.image) {
    store.dispatch('fetchAddCollection', { gameId: route.params.gameId, body: collectionModelForm.value })
      .finally(() => {
        collectionModelForm.value = { name: '', image: '', description: '' };
        isAddModal.value = false;
      });
  }
};

const onCollectionClick = (id) => {
  router.push(`/game/${route.params.gameId}/collection/${id}`);
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
  aspect-ratio: 0.71;
  border: 2px #138b44 solid;
  border-radius: 8px;
  user-select: none;
  &--unsetted {
    width: 205px;
    background-color: #138b44;
  }
}
</style>
