<template>
  <div class="page-footer">
    <span>Total items: {{ itemsStore.itemsMeta.total }}</span>
    <span>{{ systemStore.version }}</span>
  </div>
</template>

<script setup>
import { useSystemStore } from '@/stores/system'
import { useItemsStore } from '@/stores/items'

const systemStore = useSystemStore()
const itemsStore = useItemsStore()
</script>

<style lang="scss">
.page-footer {
  background: #e3ded6;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
</style>
