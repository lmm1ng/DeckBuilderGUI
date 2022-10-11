<template>
  <router-view/>
  <span class="version">{{ store.getters.getVersion }}</span>
</template>

<style lang="scss">
body, #app {
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
</style>

<script setup>
import api from '@/api';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('fetchVersion');
});

window.onbeforeunload = function () {
  api.system.quit();
};
</script>
<style lang="scss">
.app {
  position: relative;
}
.version {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: grey;
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
