<template>
  <div class="container">
    <label for="fileInput" class="form-label d-flex align-items-center"><b>Choose File</b></label>
    <input
      type="file"
      id="fileInput"
      ref="fileInput"
      @change="handleFileChange"
      class="form-control"
      accept=".txt"
    />
  </div>
</template>
<script lang="ts">
import { store } from '@/store/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheUploadEncryptedFiles.vue',

  data() {
    return {
      files: [] as any,
    };
  },

  methods: {
    handleFileChange() {
      // @ts-ignore
      this.files = this.$refs.fileInput.files;
      store.files = this.files;
    },
  },
});
</script>
