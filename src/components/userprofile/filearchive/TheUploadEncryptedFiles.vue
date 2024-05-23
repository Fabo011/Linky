<template>
  <div class="container">
    <label for="fileInput" class="form-label"><b>Choose File</b></label>
    <input
      type="file"
      id="fileInput"
      ref="fileInput"
      @change="handleFileChange"
      class="form-control"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store/store';

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
