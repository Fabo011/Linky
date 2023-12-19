<template>
  <section v-for="item in filteredLinks" :key="item.id" ref="dataComponent">
    <div class="card" id="theCard">
      <h5 class="card-header">
        <img height="18" width="18" :src="baseUrl + item.link" :alt="item.linkname" />
        {{ item.linkname }}
        <mark class="category text-primary"
          ><span id="cat">{{ item.category }}</span></mark
        >
        <button class="btn btn-danger btn-sm btn-space" @click.prevent="deleteLink(item)">
          <TheTrashIcon />
        </button>
      </h5>
      <div class="card-body">
        <h6 class="card-title">{{ item.link }}</h6>
        <p class="card-text">{{ item.linkdescription }}</p>
        <button v-if="item.category !== 'chat'" class="btn share">
          <a :href="item.link" target="_blank" class="btn btn-sm openlink">
            <TheChatBtnIcon /><br />
            <span class="clipboard">Link</span>
          </a>
        </button>

        <!--Chat-->
        <button v-if="item.category === 'chat'" class="btn share" @click.prevent="setChatKey(item)">
          <a class="btn btn-sm openlink">
            <TheChatBtnIcon /><br />
            <span class="clipboard">Link</span>
          </a>
        </button>

        <button v-if="item.category == 'chat' && store.shareChatButtonActive === true" class="btn share" @click.prevent="shareChat(item)">
          <TheShareChat />
          <span class="clipboard">Share Chat</span>
        </button>
        <!-------->

        <button v-if="item.category !== 'chat'" class="btn share" @click.prevent="shareLink(item)">
          <TheClipboardIcon /><br />
          <span class="clipboard">Copy Link</span>
        </button>

        <button
          v-if="store.editButtonActive === true && item.category !== 'chat'"
          class="btn share"
          @click.prevent="setItem(item)"
        >
          <TheLinkEdit />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from '../../../store/store';
import { defineComponent } from 'vue';
import Clipboard from 'clipboard';
import { supabase } from '../../lib/supabaseClient';
import TheTrashIcon from '@/assets/svg/TheTrashIcon.vue';
import TheClipboardIcon from '@/assets/svg/TheClipboardIcon.vue';
import TheCopyPasswordIcon from '@/assets/svg/TheCopyPasswordIcon.vue';
import TheChatBtnIcon from '@/assets/svg/TheChatBtnIcon.vue';
import TheLinkEdit from './TheLinkEdit.vue';
import TheShareChat from '../chat/TheShareChat.vue';

export default defineComponent({
  name: 'TheRetrieveAllLinks',
  components: {
    TheTrashIcon,
    TheClipboardIcon,
    TheCopyPasswordIcon,
    TheChatBtnIcon,
    TheLinkEdit,
    TheShareChat,
  },

  data() {
    return {
      store,
      baseUrl: 'http://www.google.com/s2/favicons?domain=',
      toast: true,
    };
  },

  created() {
    store.retieveAllLinks();
  },

  computed: {
    filteredLinks: function () {
      return this.store.items.filter((item) => {
        return (
          item.linkname.match(store.searchValue) ||
          item.linkdescription.match(store.searchValue) ||
          item.category.match(store.searchValue) ||
          item.link.match(store.searchValue)
        );
      });
    },
  },

  methods: {
    shareLink(item) {
      const link = item.link;
      new Clipboard('.btn', {
        text: () => {
          return link;
        },
      });
      this.$swal({
        icon: 'success',
        text: 'You copied the link to your clipboard.',
        timer: 1500,
        showConfirmButton: false,
      });
    },

    setItem(item) {
      store.editButtonActive = false;
      store.item = item;
    },

    shareChat(item) {
      store.shareChatButtonActive = false;
      store.item = item;
    },

    async deleteLink(item) {
      this.$swal({
        icon: 'warning',
        title: 'Warning',
        html: `Do you really want to delete the <b>${item.linkname}</b> link?`,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#0d6efd',
        confirmButtonText: 'Delete',
        confirmButtonColor: '#dc3545',
      }).then(async (result) => {
        if (result.value == true) {
          const username = item.username;
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
          } catch (error) {
            console.log(error);
          }
        } else {
          this.$swal.close();
        } // swal if else
      }); //swal then
    }, //deleteLink

    setChatKey(item) {
      const chatKey = item.chatKey;
      const iv = item.iv;
      sessionStorage.setItem('chatKey', chatKey);
      sessionStorage.setItem('iv', iv);
      this.$router.push(`/chat/${item.chatRoom}`);
    },
  }, //methods
});
</script>
<style scoped>
.card {
  margin-top: 10px;
}
.card-header {
  background-color: var(--primary-white-darker-background);
  color: var(--primary-background-color);
  opacity: 0.9;
}
.category {
  background-color: var(--primary-white-darker-background);
  font-size: 12px;
}
.btn-space {
  margin-left: 1px;
  background-color: var(--chat-delete-btn);
  border: none;
  opacity: 0.5;
  float: right;
  padding: 2px;
}
#cat {
  color: var(--primary-pink);
}
.openlink {
  background-color: var(--primary-blue-color);
}
.btn {
  color: var(--primary-background-color);
  color: var(--primary-white-color);
}
.share {
  color: var(--primary-background-color);
}

.clipboard {
  margin: 0;
  font-size: 8px;
}
</style>
