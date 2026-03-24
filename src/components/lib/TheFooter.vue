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
import TheCopyrightIcon from '@/assets/svg/TheCopyrightIcon.vue';
import { appVersion } from '@/globalVariables';
import { defineComponent } from 'vue';

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
  background: linear-gradient(135deg, #2a2a2a 0%, #333 100%);
  color: rgba(255, 255, 255, 0.88);
  text-align: center;
  padding: 9px;
  font-size: 12px;
  z-index: 1000;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  letter-spacing: 0.01em;
}

@media (max-width: 768px) {
  .footer {
    text-align: center;
  }
}
</style>
