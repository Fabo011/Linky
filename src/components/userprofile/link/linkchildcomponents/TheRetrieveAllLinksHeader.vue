<template>
  <div class="card-header">
    <div v-if="item.type == null" class="header-container">
      <div class="header-left">
        <img
          v-if="item.link !== '*' && item.link !== ''"
          height="18"
          width="18"
          :src="baseUrl + item.link"
          :alt="item.linkname"
        />
        {{ item.linkname }}
        <mark
          class="category text-primary mt-2"
          v-if="item.category !== '' && item.category !== '*'"
        >
          <span id="cat">{{ item.category }}</span>
        </mark>
      </div>
      <div class="header-right">
        <button class="btn btn-danger btn-sm btn-space" @click.prevent="deleteLink()">
          <TheTrashIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TheTrashIcon from '@/assets/svg/TheTrashIcon.vue';
import { defineComponent } from 'vue';
import { store } from '../../../../store/store';
import { supabase } from '../../../lib/supabaseClient';

export default defineComponent({
  name: 'TheRetrieveAllLinksHeader',
  components: {
    TheTrashIcon,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      store,
      baseUrl: 'https://www.google.com/s2/favicons?domain=',
    };
  },

  methods: {
    async deleteLink() {
      const item = this.item as any;

      // @ts-ignore
      this.$swal({
        icon: 'warning',
        title: 'Warning',
        html: `Do you really want to delete the <b>${item.linkname}</b> link?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#5F7FFF',
        confirmButtonText: 'Delete',
        confirmButtonColor: '#B30000',
      }).then(async (result: any) => {
        if (result.value == true) {
          const uuID = store.getUUID();
          const id = item.id;
          try {
            await supabase
              .from('link')
              .delete()
              .eq(`user_id`, uuID)
              .eq(`id`, id)
              .then(() => {
                store.retieveAllLinks();
              });

            if (
              item.filename.match(
                /\.(png|jpg|jpeg|gif|bmp|svg|pdf|doc|docx|xls|xlsx|ppt|pptx|odt|mp3|wav|mp4|avi|zip|rar|tar|txt|html|xml)$/,
              )
            ) {
              await supabase.storage.from('linky').remove([`${uuID}/${item.filename}`]);
            }
          } catch (error) {
            console.error('deleteLink Error: ' + error);
          }
        } else {
          // @ts-ignore
          this.$swal.close();
        } // swal if else
      }); //swal then
    }, //deleteLink
  },
});
</script>
<style scoped>
.card-header {
  background-color: var(--primary-white-darker-background);
  color: var(--primary-background-color);
  padding: 10px 14px;
  font-weight: 600;
  font-size: 14px;
  border-left: 3px solid var(--primary-blue-color);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
#cat {
  color: var(--primary-pink);
}
.btn {
  color: var(--primary-white-color);
}
.category {
  background-color: rgba(255, 102, 164, 0.12);
  color: var(--primary-pink);
  font-size: 11px;
  font-weight: 600;
  border-radius: 20px !important;
  padding: 2px 8px;
  margin-left: 6px;
}
.header-container {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.header-right {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.btn-danger {
  opacity: 0.75;
  border-radius: 6px !important;
  padding: 4px 8px;
}
</style>
