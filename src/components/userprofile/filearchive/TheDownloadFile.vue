<template>
  <button @click.prevent="downloadFile()">Download</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { supabase } from '@/components/lib/supabaseClient';
import { store } from '@/store/store';
import { errorToast, downloadtoast } from '@/components/toasts/toasts';
import { decryptFile } from '@/components/crypto/crypto';

export default defineComponent({
  name: 'TheDownloadFile.vue',

  data() {
    return {
      username: store.getUsername(),
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
                  .download(`${this.username}/${item.linkname}`);

              if (error) {
                  console.log(error);

                  //errorToast();
              }
              const blob = await decryptFile(data as any);
              //console.log(decryptedFile);
              
              
              //const blob = new Blob([decryptedFile as any], { type: 'application/octet-stream' });
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = item.linkname;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              downloadtoast();
          } catch (error) {
              //errorToast();
              console.trace(error);
          }
      },
  },
});
</script>
