<template>
  <div v-if="item.notes" style="max-height: 150px; overflow-y: auto">
    <h6>Notes</h6>
    <div>
      <p class="card-text"><i class="bi bi-card-text icons"></i>{{ item.notes }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheRetrieveNotes.vue',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
});
</script>
<style scoped>
.icons {
  margin-right: 3px;
}
</style>
