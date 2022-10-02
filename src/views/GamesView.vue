<template>
  <div class="games">
    <ui-modal
      v-model:show="isImportModal"
      @submit="onGameImport"
    >
      <div class="import-modal">
        <n-input placeholder="Title" v-model:value="gameImportModelForm.name" />
        <n-upload
          ref="uploader"
          :on-change="onImportFile"
          :max="1"
        >
          <n-upload-dragger style="background: #E3DED6;">
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <archive-outlined />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              Click or drag a file to this area to upload
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              Strictly prohibit from uploading sensitive information. For example,
              your bank card PIN or your credit card expiry date.
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </div>
    </ui-modal>
    <ui-modal
      v-model:show="isAddModal"
      @submit="onGameAdd"
    >
      <div class="add-modal">
        <div class="add-modal__inputs">
          <n-input placeholder="Title" v-model:value="gameModelForm.name"/>
          <n-input placeholder="Image" v-model:value="gameModelForm.image"/>
          <n-input
            type="textarea"
            placeholder="Description"
            :resizable="false"
            v-model:value="gameModelForm.description"
          />
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
      title="Games"
      show-buttons
      @on-add="onAdd"
      @on-import="onImport"
      with-import
    />
    <page-content>
      <div class="games__list">
        <card-el
          v-for="game in games"
          :id="game.id"
          :key="game.id"
          :name="game.name"
          :img="game.image"
          :description="game.description"
          @cardClick="onGameClick"
          with-export
          @on-export="onGameExport"
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import UiModal from '@/components/ui/uiModal.vue';

import { ArchiveOutlined } from '@vicons/material';

const store = useStore();
const router = useRouter();

onMounted(() => {
  store.dispatch('fetchGames');
});

onBeforeUnmount(() => {
  store.commit('setGames', []);
});

const games = computed(() => store.getters.getGames);
const isAddModal = ref(false);
const onAdd = () => {
  isAddModal.value = true;
};

const gameModelForm = ref({
  name: '',
  image: '',
  description: '',
});

const onGameAdd = () => {
  if (gameModelForm.value.name && gameModelForm.value.image) {
    store.dispatch('fetchAddGame', gameModelForm.value).finally(() => {
      gameModelForm.value = { name: '', image: '', description: '' };
      isAddModal.value = false;
    });
  }
};

const onGameClick = (id) => {
  router.push(`/game/${id}`);
};

const onGameExport = (id) => {
  store.dispatch('fetchExportGame', { gameId: id });
};

const gameImportModelForm = ref({
  name: '',
  file: null,
});

const isImportModal = ref(false);
const onImport = () => {
  isImportModal.value = true;
};

const uploader = ref('null');

const onGameImport = () => {
  if (gameImportModelForm.value.file) {
    const formData = new FormData();
    formData.append('name', gameImportModelForm.value.name);
    formData.append('file', gameImportModelForm.value.file);
    store.dispatch('fetchImportGame', formData).then(() => store.dispatch('fetchGames'))
      .finally(() => {
        gameImportModelForm.value = {
          name: '',
          file: null,
        };
        isImportModal.value = false;
        uploader.value.clear();
      });
  }
};
const onImportFile = ({ file }) => {
  gameImportModelForm.value.file = file.file;
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

.import-modal {
  padding: 0 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
}
</style>
