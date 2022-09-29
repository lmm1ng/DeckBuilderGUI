<template>
  <div class="card">
    <img @contextmenu="onRightClick" class="img" :src="props.img" :alt="props.title" />
    <div class="label">{{ props.title }}</div>
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
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  img: {
    type: String,
    default: '',
  },
});

// context menu
const showDropdownRef = ref(false);
const xRef = ref(0);
const yRef = ref(0);

const options = [
  {
    label: 'Change',
    key: 'change',
  },
  {
    label: 'Export',
    key: 'Export',
  },
  {
    label: 'Delete',
    key: 'delete',
  },
];

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
  showDropdownRef.value = false;
  console.log(key);
};
</script>

<style lang="scss">
.img {
  max-width: 205px;
  aspect-ratio: 0.71;
  border: 2px #138b44 solid;
  border-radius: 8px;
  user-select: none;
}

.label {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin-top: 8px;
}
</style>
