<template>
  <div v-if="store.isLoading == true" class="spinner-container">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="loading-text">decrypting your data...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store/store';

export default defineComponent({
  name: 'TheLoadingSpinner.vue',

  data() {
    return {
      store,
    };
  },
});
</script>

<style scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--primary-blue-color);
}
</style>
