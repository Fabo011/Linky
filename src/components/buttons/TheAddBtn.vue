<template>
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Add</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheAddButton.vue',
});
</script>

<style scoped>
.btn {
  background-color: var(--primary-blue-color);
}
</style>
