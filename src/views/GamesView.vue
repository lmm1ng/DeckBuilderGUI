<template>
  <div class="games">
    <ui-modal
      v-model:show="isAddModal"
      @submit="onGameAdd"
    >
      <div class="add-modal">
        <div class="add-modal__inputs">
          <n-input placeholder="Title" v-model:value="gameModelForm.title"/>
          <n-input placeholder="Image" v-model:value="gameModelForm.image"/>
        </div>
        <div class="add-modal__preview">
          <img
            v-if="gameModelForm.image"
            class="game-preview"
            :src="gameModelForm.image"
            alt="preview"
          />
          <div class="game-preview game-preview--unsetted" v-else></div>
        </div>
      </div>
    </ui-modal>
    <page-header
      title="kek"
      show-buttons
      @on-add="onAdd"
    />
    <page-content>
      <div class="games__list">
        <card-el
          v-for="game in games"
          :key="game.title"
          :title="game.title"
          :img="game.image"
        />
      </div>
    </page-content>
  </div>
</template>

<script setup>
import PageHeader from '@/components/layout/PageHeader.vue';
import PageContent from '@/components/layout/PageContent.vue';
import CardEl from '@/components/CardEl.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import UiModal from '@/components/ui/uiModal.vue';

const store = useStore();

const games = computed(() => store.getters.getGames);
const isAddModal = ref(false);
const onAdd = () => {
  isAddModal.value = true;
};
const gameModelForm = ref({
  title: '',
  image: '',
});

const onGameAdd = () => {
  if (gameModelForm.value.title && gameModelForm.value.image) {
    store.dispatch('fetchAddGame', gameModelForm.value);
    gameModelForm.value = { title: '', image: '' };
    isAddModal.value = false;
  }
};
</script>

<style lang="scss">
.games {
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
.game-preview {
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
