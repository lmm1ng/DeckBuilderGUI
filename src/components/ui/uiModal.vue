<template>
  <div :class="['modal', { 'modal--active': props.show }]">
    <div class="modal__wrapper">
      <div class="modal__header">
        11
      </div>
      <div class="modal__content">
        <slot/>
      </div>
      <div class="modal__buttons">
        <n-button type="error" @click="emit('update:show', false)">cancel</n-button>
        <n-button type="primary" @click="emit('submit')">okay</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:show', 'submit']);
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
