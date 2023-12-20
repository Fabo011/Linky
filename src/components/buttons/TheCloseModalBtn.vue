<template>
  <button
    type="button"
    class="btn-close"
    data-bs-dismiss="modal"
    aria-label="Close"
  ></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store/store';

export default defineComponent({
  name: 'TheCloseModalBtn.vue',
});
</script>
