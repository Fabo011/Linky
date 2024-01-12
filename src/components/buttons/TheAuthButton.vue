<template>
  <button type="button" class="btn w-100">
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheAuthButton.vue',

  beforeMount() {
    const route = this.$route.name;
    if (route === 'signin') {
      this.buttonText = 'Login';
    } else if (route === 'signup') {
      this.buttonText = 'Register';
    } else if (route === 'key') {
      this.buttonText = 'Got To Account';
    }
  },

  data() {
    return {
      buttonText: '',
    };
  },
});
</script>

<style scoped>
.btn {
  background-color: var(--primary-blue-color);
  color: var(--primary-white-color);
}
</style>
