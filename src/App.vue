<template>
  <n-dialog-provider>
    <router-view :key="router.path" />
  </n-dialog-provider>
  <span class="version">{{ systemStore.version }}</span>
</template>

<script setup>
import api from '@/api'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSystemStore } from '@/stores/system'

const systemStore = useSystemStore()
const router = useRoute()

onMounted(() => {
  systemStore.fetchVersion()
})

window.onbeforeunload = function () {
  api.system.quit()
}
</script>

<style lang="scss">
body,
#app {
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
</style>
<style lang="scss">
.app {
  position: relative;
}
.version {
  position: absolute;
  bottom: 10px;
  right: 25px;
  color: grey;
  user-select: none;
}

// card transition

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
