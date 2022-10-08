<template>
  <div
    :class="['modal', { 'modal--active': isShow }]"
    @keydown="onKeyDown"
    ref="modal"
    tabindex="0"
  >
    <div class="modal__wrapper">
      <div class="modal__header">
        {{ title }}
      </div>
      <div class="modal__content">
        <slot/>
      </div>
      <div class="modal__buttons">
        <n-button type="error" @click="isShow = false">cancel</n-button>
        <n-button type="primary" @click="emit('submit')">okay</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  nextTick,
  computed,
} from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:show', 'submit']);

const isShow = computed({
  get() {
    return props.show;
  },
  set(val) {
    emit('update:show', val);
  },
});

const modal = ref(null);

watch(isShow, (val) => {
  if (val) {
    nextTick(() => {
      modal.value.focus();
    });
  }
});

const onKeyDown = (e) => {
  if (e.code === 'Escape') {
    isShow.value = false;
  } else if (e.code === 'Enter' && !e.shiftKey) {
    emit('submit');
  }
};
</script>

<style lang="scss">
.modal {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #0d5f3070;
  &--active {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__header {
    background-color: #169747;
    height: 30px;
    padding: 5px;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    line-height: 30px;
    color: #e3ded6;
    font-weight: bold;
  }
  &__content {
    flex: 1 1 0;
  }
  &__buttons {
    display: flex;
    justify-content: end;
    gap: 10px;
    padding: 15px;
  }
  &__wrapper {
    width: 90vw;
    height: 80vh;
    max-width: 800px;
    background-color: #e3ded6;
    display: flex;
    flex-direction: column;
  }
}
</style>
