<template>
  <div class="decks">
    <ui-modal
      v-model:show="isAddModal"
      :title="computedModalTitle"
      @submit="onDeckSubmit"
    >
      <div class="add-modal">
        <div class="add-modal__inputs">
          <n-input placeholder="Title" v-model:value="deckModelForm.name"/>
          <n-input placeholder="Image" v-model:value="deckModelForm.image"/>
          <n-input
            type="textarea"
            placeholder="Description"
            :resizable="false"
            v-model:value="deckModelForm.description"
          />
        </div>
        <div class="add-modal__preview">
          <img
            v-if="deckModelForm.image"
            class="deck-preview"
            :src="deckModelForm.image"
            alt="preview"
          />
          <div class="deck-preview deck-preview--unsetted" v-else></div>
        </div>
      </div>
    </ui-modal>
    <page-header
      title="Decks"
      show-buttons
      @on-add="onAdd"
    />
    <page-content>
      <div class="decks__list">
        <card-el
          v-for="deck in decks"
          :key="deck.id"
          :name="deck.name"
          :img="deck.cachedImage"
          :description="deck.description"
          :id="deck.id"
          @cardClick="onDeckClick"
          @on-edit="onDeckEdit"
          @on-delete="onDeckDelete"
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
  onBeforeUnmount, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import UiModal from '@/components/ui/uiModal.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  store.dispatch('fetchDecks', { gameId: route.params.gameId, collectionId: route.params.collectionId });
});

onBeforeUnmount(() => {
  store.commit('setDecks', []);
});

const decks = computed(() => store.getters.getDecks);
const isAddModal = ref(false);
const onAdd = () => {
  isAddModal.value = true;
};
const deckModelForm = ref({
  name: '',
  image: '',
  description: '',
});

const editDeckId = ref('_');

watch(isAddModal, (val) => {
  if (!val) {
    editDeckId.value = '_';
    deckModelForm.value = { name: '', image: '', description: '' };
  }
});

const computedModalTitle = computed(() => (editDeckId.value === '_' ? 'Create deck' : 'Edit deck'));

const onDeckSubmit = () => {
  const action = editDeckId.value !== '_' ? 'fetchEditDeck' : 'fetchAddDeck';
  if (deckModelForm.value.name && deckModelForm.value.image) {
    store.dispatch(action, {
      gameId: route.params.gameId,
      collectionId: route.params.collectionId,
      deckId: editDeckId.value,
      body: { ...deckModelForm.value },
    })
      .finally(() => {
        deckModelForm.value = { name: '', image: '', description: '' };
        isAddModal.value = false;
      });
  }
};

const onDeckEdit = (id) => {
  store.dispatch('fetchDeck', {
    gameId: route.params.gameId,
    collectionId: route.params.collectionId,
    deckId: id,
  }).then((response) => {
    deckModelForm.value = {
      name: response.name,
      image: response.image,
      description: response.description,
    };
    isAddModal.value = true;
    editDeckId.value = id;
  });
};

const onDeckDelete = (id) => {
  store.dispatch('fetchDeleteDeck', {
    gameId: route.params.gameId,
    collectionId: route.params.collectionId,
    deckId: id,
  });
};

const onDeckClick = (id) => {
  router.push(`/game/${route.params.gameId}/collection/${route.params.collectionId}/deck/${id}`);
};
</script>

<style lang="scss">
.decks {
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
.deck-preview {
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
