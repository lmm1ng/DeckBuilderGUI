<template>
  <div class="page-header">
    <span class="page-header__path"> {{ props.title }} </span>
    <div class="page-header__buttons" v-if="props.showButtons">
      <Icon class="icon" size="24" @click="emit('on-add')">
        <AddFilled />
      </Icon>
      <Icon class="icon" size="24">
        <NoteAddOutlined />
      </Icon>
      <Icon class="icon" size="24">
        <SearchOutlined />
      </Icon>
    </div>
  </div>
</template>

<script setup>
import { AddFilled, NoteAddOutlined, SearchOutlined } from '@vicons/material';
import { Icon } from '@vicons/utils';
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  showButtons: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['on-add']);
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
</style>
