<template>
  <div class="card-header">
    <div v-if="item.type == null" class="header-container">
      <div class="header-left">
        <img height="18" width="18" :src="baseUrl + item.link" :alt="item.linkname" />
        {{ item.linkname }}
        <mark class="category text-primary mt-2">
          <span id="cat">{{ item.category }}</span>
        </mark>
      </div>
      <div class="header-right">
        <button class="btn btn-danger btn-sm btn-space" @click.prevent="deleteLink()">
          <TheTrashIcon />
        </button>
      </div>
    </div>
    <div v-if="item.type === 'file'" class="header-container">
      <div class="header-left">
        <img height="18" width="18" src="../../../../assets/file.png" :alt="item.linkname" />
        {{ item.linkname }}
        <mark class="category text-primary mt-2">
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
import { store } from '../../../../store/store';
import { defineComponent } from 'vue';
import { supabase } from '../../../lib/supabaseClient';
import TheTrashIcon from '@/assets/svg/TheTrashIcon.vue';

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
          const username = item.username;
          const uuid = store.getUUID();
          const link = item.link;
          try {
            await supabase
              .from('link')
              .delete()
              .eq(`username`, username)
              .eq(`link`, link)
              .then(() => {
                store.retieveAllLinks();
              });

            if (
              item.linkname.match(
                /\.(png|jpg|jpeg|gif|bmp|svg|pdf|doc|docx|xls|xlsx|ppt|pptx|odt|mp3|wav|mp4|avi|zip|rar|tar|txt|html|xml)$/,
              )
            ) {
              await supabase.storage.from('linky').remove([`${uuid}/${item.linkname}`]);
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
  opacity: 0.8;
}
#cat {
  color: var(--primary-pink);
}
.btn {
  color: var(--primary-background-color);
  color: var(--primary-white-color);
}
.category {
  background-color: var(--primary-white-darker-background);
  font-size: 12px;
}

.header-container {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.header-right {
  display: flex;
  align-items: right;
  margin-left: auto;
}
.btn-danger {
  opacity: 0.7;
}
</style>
