<template>
  <button class="btn btn-primary" type="button" disabled>
    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
    Loading ...
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheLoadingButton.vue',
});
</script>
