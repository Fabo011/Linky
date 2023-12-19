<template>
  <footer class="footer">
    <div class="container text-center">
      <p class="mb-0"><the-copyright-icon></the-copyright-icon> linky-cloud {{ version }}</p>
      <div class="mt-1">
        <router-link to="/privacy">
          <a href="#" class="text-white mx-auto">Imprint & Privacy</a>
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { appVersion } from '@/globalVariables';
import TheCopyrightIcon from '@/assets/svg/TheCopyrightIcon.vue';

export default defineComponent({
  components: { TheCopyrightIcon },

  data() {
    return {
      version: appVersion,
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
