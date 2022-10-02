<template>
  <div class="decks">
    <ui-modal
      v-model:show="isAddModal"
      @submit="onDeckAdd"
    >
      <div class="add-modal">
        <div class="add-modal__inputs">
          <n-input placeholder="Title" v-model:value="deckModelForm.type"/>
          <n-input placeholder="Image" v-model:value="deckModelForm.backside"/>
          <n-input
            type="textarea"
            placeholder="Description"
            :resizable="false"
            v-model:value="deckModelForm.description"
          />
        </div>
        <div class="add-modal__preview">
          <img
            v-if="deckModelForm.backside"
            class="deck-preview"
            :src="deckModelForm.backside"
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
          :name="deck.type"
          :img="deck.backside"
          :description="deck.description"
          :id="deck.id"
          @cardClick="onDeckClick"
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
  type: '',
  backside: '',
  description: '',
});

const onDeckAdd = () => {
  if (deckModelForm.value.type && deckModelForm.value.backside) {
    store.dispatch('fetchAddDeck', { gameId: route.params.gameId, collectionId: route.params.collectionId, body: deckModelForm.value })
      .finally(() => {
        deckModelForm.value = { type: '', backside: '', description: '' };
        isAddModal.value = false;
      });
  }
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
