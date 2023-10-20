<template>
  <footer class="footer">
    <div class="container text-center">
      <p class="mb-0">App Version {{ version }}</p>
      <div class="mt-1">
        <a href="/impressum" class="text-white mx-auto">Impresum & Privacy</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
    };
  },
});
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 8px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .footer {
    text-align: center;
  }
}
</style>
