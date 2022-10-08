<template>
  <router-view/>
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

window.onbeforeunload = function () {
  api.system.quit();
};
</script>
