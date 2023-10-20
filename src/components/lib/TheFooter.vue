<template>
  <footer class="footer">
    <div class="container text-center">
      <p class="mb-0">App Version {{ version }}</p>
      <div class="mt-1">
        <a href="/impressum" class="text-white me-3">Impresum</a>
        <a href="/privacy" class="text-white">Privacy</a>
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
  background-color: #333; /* Choose the background color you prefer */
  color: white;
  text-align: center;
  padding: 8px;
  font-size: 12px;
}

.footer .links {
  display: flex;
  justify-content: center;
}

.footer .links a {
  color: white;
  text-decoration: none;
  margin: 0 5px 1px 5px;
}

/* Media query for small screens (optional) */
@media (max-width: 768px) {
  .footer {
    text-align: center;
  }
}
</style>
