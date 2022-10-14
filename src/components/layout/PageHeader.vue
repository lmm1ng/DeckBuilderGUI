<template>
  <div class="page-header">
    <n-drawer v-model:show="isDrawer">
      <n-drawer-content title="Filters" footer-style="flex-direction: column;">
        <n-form>
          <n-form-item label="Sort by:">
            <n-select
              :value="mainStore.sort"
              :options="drawerOptions"
              :on-update:value="onSortingSelect"
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <div>Developed by:</div>
          <div>
            <n-button
              text
              tag="a"
              href="https://github.com/HardDie"
              target="_blank"
              type="primary"
              block
              style="justify-content: flex-start"
            >
              @harddie
            </n-button>
            <n-button
              text
              tag="a"
              href="https://github.com/lmm1ng"
              target="_blank"
              type="primary"
              block
              style="justify-content: flex-start"
            >
              @lemm1ng
            </n-button>
          </div>
        </template>
      </n-drawer-content>
    </n-drawer>
    <span class="page-header__path">
      <n-breadcrumb class="breadcrumb-path">
        <n-breadcrumb-item
          @click="onBreadcrumbItemClick(0)"
        >
          DeckBuilder
        </n-breadcrumb-item>
        <n-breadcrumb-item
          v-for="(path, idx) in mainStore.breadcrumbPathItems"
          :key="idx + 1"
          @click="onBreadcrumbItemClick(idx + 1)"
        >
          {{ path }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </span>
    <div class="page-header__buttons" v-if="props.showButtons">
      <n-tooltip trigger="hover" :delay="300">
        <template #trigger>
          <Icon class="icon header__button" size="24" @click="emit('on-add')">
            <AddFilled />
          </Icon>
        </template>
        <span>{{createTooltipText}}</span>
      </n-tooltip>
      <n-tooltip v-if="props.withImport" trigger="hover" :delay="300">
        <template #trigger>
          <Icon
            class="icon header__button"
            size="24"
            @click="emit('on-import')"
          >
            <NoteAddOutlined />
          </Icon>
        </template>
        <span>Import game</span>
      </n-tooltip>
      <n-tooltip trigger="hover" :delay="300">
        <template #trigger>
          <Icon class="icon header__button" size="24" @click="isDrawer = true">
            <SearchOutlined />
          </Icon>
        </template>
        <span>Filters</span>
      </n-tooltip>
    </div>
  </div>
</template>

<script setup>
import { AddFilled, NoteAddOutlined, SearchOutlined } from '@vicons/material';
import { Icon } from '@vicons/utils';
import { defineProps, ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/main';

const mainStore = useStore();
const router = useRouter();

const props = defineProps({
  showButtons: {
    type: Boolean,
    default: false,
  },
  withImport: {
    type: Boolean,
    default: false,
  },
  createTooltipText: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['on-add', 'on-import', 'on-sort']);

const isDrawer = ref(false);

const drawerOptions = [
  {
    label: 'A-Z',
    value: 'name',
  },
  {
    label: 'Z-A',
    value: 'name_desc',
  },
  {
    label: 'Date added (oldest)',
    value: 'created',
  },
  {
    label: 'Date added (newest)',
    value: 'created_desc',
  },
];

const onSortingSelect = (val) => {
  mainStore.setSort(val);
  emit('on-sort');
};

const onBreadcrumbItemClick = (idx) => {
  router.push(`/${mainStore.pathItems.slice(0, idx * 2).join('/')}`);
};
</script>

<style lang="scss">
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #169747;
  padding: 0 16px;
  min-height: 56px;
  &__path {
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    color: #e3ded6;
    font-weight: bold;
  }
  &__buttons {
    display: flex;
    gap: 16px;
    padding: 0;
    align-items: center;
    list-style: none;
  }
}
.icon {
  color: #e3ded6;
}
.icon:hover {
  color: #968c7b;
}

.breadcrumb-path {
  user-select: none;
  &.n-breadcrumb {
    white-space: normal;
  }
  .n-breadcrumb-item:last-child .n-breadcrumb-item__link {
    font-weight: bold;
  }
  .n-breadcrumb-item__link, .n-breadcrumb-item__separator {
    color: #e3ded6!important;
  }
}
.header__button {
  cursor: pointer;
}
</style>
