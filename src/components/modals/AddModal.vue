<template>
  <ui-modal
    v-model:show="isModalModel"
    :title="title"
    @submit="onAdd"
  >
    <div class="add-modal">
      <div class="add-modal__inputs">
        <n-input placeholder="Title" v-model:value="form.name"/>
        <n-input
          placeholder="Image link"
          v-model:value="form.image"
          @input="previewCacheStub = ''"
        />
        <n-input-number
          v-if="props.count"
          placeholder="Count"
          v-model:value="form.count"
          :min="1"
          :max="999"
        />
        <n-input
          type="textarea"
          placeholder="Description"
          :resizable="false"
          v-model:value="form.description"
        />
        <n-dynamic-input
          v-if="props.variables"
          v-model:value="form.variables"
          preset="pair"
        />
      </div>
      <div class="add-modal__preview">
        <img
          v-if="form.image"
          class="card-preview"
          :src="previewCacheStub || form.image"
          alt="preview"
        />
        <div class="card-preview card-preview--unsetted" v-else></div>
      </div>
    </div>
  </ui-modal>
</template>

<script setup>
import UiModal from '@/components/ui/uiModal.vue';
import {
  computed,
  defineEmits,
  defineProps,
  reactive,
  watch,
  toRef,
  ref,
} from 'vue';

const emit = defineEmits(['update:show', 'submit']);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  initialData: {
    type: Object,
    default: () => {},
  },
  entityType: {
    type: String,
    default: '',
  },
  count: {
    type: Boolean,
    default: false,
  },
  variables: {
    type: Boolean,
    default: false,
  },
});

const isModalModel = computed({
  get() {
    return props.show;
  },
  set(val) {
    emit('update:show', val);
  },
});

const form = reactive({
  name: '',
  image: '',
  description: '',
  count: 1,
  variables: [],
});

const initialDataRef = toRef(props, 'initialData');
const entityTypeRef = toRef(props, 'entityType');

const mode = computed(() => (Object.keys(initialDataRef.value).length ? 'edit' : 'create'));

const previewCacheStub = ref('');

const title = computed(() => (
  `${mode.value[0].toUpperCase() + mode.value.slice(1)} `
  + `${entityTypeRef.value.slice(0, entityTypeRef.value.length - 1)}`
));

watch(isModalModel, () => {
  previewCacheStub.value = `${initialDataRef?.value?.cachedImage}?${Math.random()}`;
  form.name = initialDataRef.value?.name || '';
  form.image = initialDataRef.value?.image || '';
  form.description = initialDataRef.value?.description || '';
  form.count = initialDataRef.value?.count || 1;
  form.variables = initialDataRef.value?.variables
    ? Object.entries(initialDataRef.value?.variables).map(([key, value]) => ({ key, value }))
    : [];
});

const onAdd = () => {
  const variables = form.variables.reduce((acc, cur) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {});
  const preparedData = {
    ...form,
    variables,
  };
  emit('submit', { mode: mode.value, data: preparedData });
};
</script>

<style lang="scss">
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
