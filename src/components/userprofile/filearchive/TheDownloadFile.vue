<template>
  <button class="btn share" @click.prevent="downloadFile()">
    <div class="d-flex justify-content-center align-items-center">
      <TheDownloadIcon />
    </div>
    <span class="clipboard">Download</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { supabase } from '@/components/lib/supabaseClient';
import { store } from '@/store/store';
import { errorToast, downloadtoast } from '@/components/toasts/toasts';
import { decryptFile } from '@/components/crypto/crypto';
import TheDownloadIcon from '@/assets/svg/TheDownloadIcon.vue';

export default defineComponent({
  name: 'TheDownloadFile.vue',
  components: {
    TheDownloadIcon,
  },

  data() {
    return {
      uuid: store.getUUID(),
    };
  },

  props: {
    item: Object,
  },

  methods: {
    async downloadFile() {
      const item = this.item as any;

      try {
        const { error, data } = await supabase.storage
          .from('linky')
          .download(`${this.uuid}/${item.linkname}`);

        if (error) {
          console.log(error);
          errorToast();
        }

        const decryptedData = await decryptFile(data);
        const fileType = this.determineFileType(item.linkname);
        const decryptedBlob = new Blob([decryptedData], { type: fileType });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(decryptedBlob);
        link.download = item.linkname;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        downloadtoast();
      } catch (error) {
        errorToast();
        throw new Error('downloadFile Error: ' + error);
      }
    },

    determineFileType(fileName: string): string {
      const fileExtension = fileName.split('.').pop()?.toLowerCase();

      switch (fileExtension) {
        // Images
        case 'png':
          return 'image/png';
        case 'jpg':
        case 'jpeg':
          return 'image/jpeg';
        case 'gif':
          return 'image/gif';
        case 'bmp':
          return 'image/bmp';
        case 'svg':
          return 'image/svg+xml';

        // Documents
        case 'pdf':
          return 'application/pdf';
        case 'doc':
        case 'docx':
          return 'application/msword';
        case 'xls':
        case 'xlsx':
          return 'application/vnd.ms-excel';
        case 'ppt':
        case 'pptx':
          return 'application/vnd.ms-powerpoint';
        case 'odt':
          return 'application/vnd.oasis.opendocument.text';

        // Audio
        case 'mp3':
          return 'audio/mpeg';
        case 'wav':
          return 'audio/wav';

        // Video
        case 'mp4':
          return 'video/mp4';
        case 'avi':
          return 'video/x-msvideo';

        // Archives
        case 'zip':
          return 'application/zip';
        case 'rar':
          return 'application/x-rar-compressed';
        case 'tar':
          return 'application/x-tar';

        // Text
        case 'txt':
          return 'text/plain';
        case 'html':
          return 'text/html';
        case 'xml':
          return 'application/xml';

        // Default for unknown types
        default:
          return 'application/octet-stream';
      }
    },
  },
});
</script>
<style scoped>
.btn {
  color: var(--primary-background-color);
  color: var(--primary-white-color);
}
.clipboard {
  margin: 0;
  font-size: 10px;
}
</style>
