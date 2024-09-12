<template>
  <div class="container">
    <label for="fileInput" class="form-label d-flex align-items-center">
      <div v-if="state !== 'create'">
        <mark class="updateText"
          >Update file <i class="currentText">{{ state }}</i> with:</mark
        >
      </div>
      <div v-if="state == 'create'">
        <b>Choose File</b>
      </div>
    </label>
    <input
      type="file"
      id="fileInput"
      ref="fileInput"
      @change="handleFileChange"
      class="form-control"
      accept=".txt, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .odt, .odp, .ods, .odf, .png, .jpg, .jpeg"
      multiple="false"
    />
  </div>
</template>
<script lang="ts">
import { store } from '@/store/store';
import { defineComponent } from 'vue';
import { errorToastFileUpload } from '../../toasts/toasts';
import { uploadFile } from './upload';

export default defineComponent({
  name: 'TheUploadEncryptedFiles.vue',

  props: {
    state: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      files: [] as any,
    };
  },

  methods: {
    async handleFileChange() {
      const maxSize = 150 * 1024 * 1024; // 150MB in bytes
      // @ts-ignore
      const files = this.$refs.fileInput.files;

      if (files > maxSize) {
        errorToastFileUpload();
      } else {
        store.files = files;
        await uploadFile();
      }
    },
  },
});
</script>
