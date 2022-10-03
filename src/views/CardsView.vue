<template>
  <div class="cards">
    <ui-modal
      v-model:show="isAddModal"
      :title="computedModalTitle"
      @submit="onCardSubmit"
    >
      <div class="add-modal">
        <div class="add-modal__inputs">
          <n-input placeholder="Title" v-model:value="cardModelForm.name"/>
          <n-input placeholder="Image" v-model:value="cardModelForm.image"/>
          <n-input
            type="textarea"
            placeholder="Description"
            :resizable="false"
            v-model:value="cardModelForm.description"
          />
          <n-dynamic-input
            v-model:value="cardModelForm.variables"
            preset="pair"
          />
        </div>
        <div class="add-modal__preview">
          <img
            v-if="cardModelForm.image"
            class="card-preview"
            :src="cardModelForm.image"
            alt="preview"
          />
          <div class="card-preview card-preview--unsetted" v-else></div>
        </div>
      </div>
    </ui-modal>
    <page-header
      title="Cards"
      show-buttons
      @on-add="onAdd"
    />
    <page-content>
      <div class="cards__list">
        <card-el
          v-for="card in cards"
          :key="card.id"
          :name="card.name"
          :img="card.cachedImage"
          :description="card.description"
          :id="String(card.id)"
          @on-edit="onCardEdit"
          @on-delete="onCardDelete"
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
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import UiModal from '@/components/ui/uiModal.vue';

const store = useStore();
const route = useRoute();

onMounted(() => {
  store.dispatch('fetchCards', { gameId: route.params.gameId, collectionId: route.params.collectionId, deckId: route.params.deckId });
});

onBeforeUnmount(() => {
  store.commit('setCards', []);
});

const cards = computed(() => store.getters.getCards);
const isAddModal = ref(false);
const onAdd = () => {
  isAddModal.value = true;
};
const cardModelForm = ref({
  name: '',
  image: '',
  description: '',
  variables: [],
});

const editCardId = ref('_');

watch(isAddModal, (val) => {
  if (!val) {
    editCardId.value = '_';
    cardModelForm.value = {
      name: '',
      image: '',
      description: '',
      variables: [],
    };
  }
});

const computedModalTitle = computed(() => (editCardId.value === '_' ? 'Create card' : 'Edit card'));

const onCardSubmit = () => {
  const action = editCardId.value !== '_' ? 'fetchEditCard' : 'fetchAddCard';
  if (cardModelForm.value.name && cardModelForm.value.image) {
    const variables = cardModelForm.value.variables.reduce((acc, cur) => {
      acc[cur.key] = cur.value;
      return acc;
    }, {});
    store.dispatch(action, {
      gameId: route.params.gameId,
      collectionId: route.params.collectionId,
      deckId: route.params.deckId,
      cardId: editCardId.value,
      body: {
        ...cardModelForm.value,
        variables,
      },
    })
      .finally(() => {
        cardModelForm.value = {
          name: '',
          image: '',
          description: '',
          variables: [],
        };
        isAddModal.value = false;
      });
  }
};
const onCardEdit = (id) => {
  store.dispatch('fetchCard', {
    gameId: route.params.gameId,
    collectionId: route.params.collectionId,
    deckId: route.params.deckId,
    cardId: id,
  }).then((response) => {
    const {
      name,
      image,
      description,
      variables,
    } = response;
    cardModelForm.value = {
      name,
      image,
      description,
      variables: Object.entries(variables).map(([key, value]) => ({ key, value })),
    };
    isAddModal.value = true;
    editCardId.value = id;
  });
};

const onCardDelete = (id) => {
  store.dispatch('fetchDeleteCard', {
    gameId: route.params.gameId,
    collectionId: route.params.collectionId,
    deckId: route.params.deckId,
    cardId: id,
  });
};
</script>

<style lang="scss">
.cards {
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
.card-preview {
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
