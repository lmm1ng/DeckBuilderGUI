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
</style>
