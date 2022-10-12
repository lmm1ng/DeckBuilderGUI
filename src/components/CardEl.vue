<template>
  <div :class="['card', { 'card--hover': !disableHover }]">
    <n-tooltip trigger="hover" placement="bottom" :delay="1000">
      <template #trigger>
        <img
          @contextmenu="onRightClick"
          class="img"
          rel="preload"
          :src="props.img"
          :alt="props.title"
          @click="onCardClick"
        />
      </template>
      <span>{{ props.description }}</span>
    </n-tooltip>
    <div class="label">
      <span>{{ props.name }}</span>
      <span class="label__count">{{ cardCount }}</span>
    </div>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="xRef"
      :y="yRef"
      :options="options"
      :show="showDropdownRef"
      :on-clickoutside="onClickOutside"
      @select="handleSelect"
    />
  </div>
</template>

<script setup>
import { ref, defineEmits, computed } from 'vue';

const emit = defineEmits(['cardClick', 'on-edit', 'on-delete', 'on-export']);

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  img: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  withExport: {
    type: Boolean,
    default: false,
  },
  withDuplicate: {
    type: Boolean,
    default: false,
  },
  withRender: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 1,
  },
  disableHover: {
    type: Boolean,
    default: false,
  },
});

const cardCount = computed(() => (props.count > 1 ? ` x${props.count}` : ''));

// context menu
const showDropdownRef = ref(false);
const xRef = ref(0);
const yRef = ref(0);

const options = computed(() => {
  const optionsArr = [
    {
      label: 'Change',
      key: 'change',
    },
  ];
  if (props.withExport) {
    optionsArr.push({ label: 'Export', key: 'export' });
  }
  if (props.withDuplicate) {
    optionsArr.push({ label: 'Duplicate', key: 'duplicate' });
  }
  if (props.withRender) {
    optionsArr.push({ label: 'Render', key: 'render' });
  }
  optionsArr.push({ label: 'Delete', key: 'delete' });
  return optionsArr;
});

const onRightClick = (e) => {
  e.preventDefault();
  showDropdownRef.value = true;
  xRef.value = e.clientX;
  yRef.value = e.clientY;
};
const onClickOutside = () => {
  showDropdownRef.value = false;
};

const handleSelect = (key) => {
  if (key === 'change') {
    emit('on-edit', props.id);
  }
  if (key === 'delete') {
    emit('on-delete', props.id);
  }
  if (key === 'export') {
    emit('on-export', props.id);
  }
  if (key === 'duplicate') {
    emit('on-duplicate', props.id);
  }
  if (key === 'render') {
    emit('on-render', props.id);
  }
  showDropdownRef.value = false;
};

const onCardClick = () => {
  emit('cardClick', props.id);
};
</script>

<style lang="scss">
.img {
  max-width: 205px;
  border: 2px #138b44 solid;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
}

.label {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin-top: 8px;
  &__count {
    color: grey;
  }
}
.card {
  &--hover:hover {
    transform: scale(1.03);
  }
}
</style>
