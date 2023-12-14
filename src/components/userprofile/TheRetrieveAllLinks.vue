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
        <button class="btn share">
          <a :href="item.link" target="_blank" class="btn btn-sm openlink">
            <TheChatBtnIcon /><br />
            <span class="clipboard">Link</span>
          </a>
        </button>

        <button class="btn share" @click.prevent="shareLink(item)">
          <TheClipboardIcon /><br />
          <span class="clipboard">Copy Link</span>
        </button>

        <button
          v-if="item.linkUsername !== null && item.chatRoom == null"
          class="btn share"
          @click.prevent="copyUsername(item)"
        >
          <TheUsernameIcon /><br />
          <span class="clipboard">Copy Username</span>
        </button>

        <button
          v-if="item.linkPassword !== null && item.chatRoom == null"
          class="btn share"
          @click.prevent="copyPassword(item)"
        >
          <TheCopyPasswordIcon /><br />
          <span class="clipboard">Copy Password</span>
        </button>

        <button
            v-if="item.chatSecret !== null"
            class="btn share"
            @click.prevent="copyChatSecret(item)"
          >
            <TheChatSecretIcon /><br />
            <span class="clipboard">Copy Chat Secret Key</span>
          </button>

        <button
          v-if="store.editButtonActive === true && !item.chatRoom"
          class="btn share"
          @click.prevent="setItem(item)"
        >
          <TheLinkEdit />
          <span class="clipboard">Edit</span>
        </button>

        <button
          v-if="store.editButtonActive === true && item.chatRoom"
          class="btn share"
          @click.prevent="setItem(item)"
        >
          <TheChatEdit />
          <span class="clipboard">Edit</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from '@/store/store';
import { defineComponent } from 'vue';
import Clipboard from 'clipboard';
import { supabase } from '@/components/lib/supabaseClient';
import TheTrashIcon from '@/assets/svg/TheTrashIcon.vue';
import TheClipboardIcon from '@/assets/svg/TheClipboardIcon.vue';
import TheCopyPasswordIcon from '@/assets/svg/TheCopyPasswordIcon.vue';
import TheChatBtnIcon from '@/assets/svg/TheChatBtnIcon.vue';
import TheLinkEdit from '@/components/userprofile/link/TheLinkEdit.vue';
import TheUsernameIcon from '@/assets/svg/TheUsernameIcon.vue';
import TheChatEdit from '@/components/userprofile/chat/TheChatEdit.vue';
import {
  copiedtoast,
  deletedtoast,
  deletionUnsuccessfullToast,
  deleteWarnToast,
} from '../toasts/toasts';
import { deleteItemInArrayLocally } from '@/components/lib/changeItemInArrayLocally';
import TheChatSecretIcon from '@/assets/svg/TheChatSecretIcon.vue';

export default defineComponent({
  name: 'TheRetrieveAllLinks',
  components: {
    TheTrashIcon,
    TheClipboardIcon,
    TheCopyPasswordIcon,
    TheChatBtnIcon,
    TheLinkEdit,
    TheUsernameIcon,
    TheChatEdit,
    TheChatSecretIcon
  },

  data() {
    return {
      store,
      baseUrl: 'http://www.google.com/s2/favicons?domain=',
      toast: true,
      active: true,
      deleteCount: 0,
    };
  },

  async beforeCreate() {
    await store.retrieveAllLinks();
  },

  created() {
    setTimeout(() => {
      store.isLoading = false;
    }, 4000);
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
      copiedtoast();
    },

    copyUsername(item) {
      const linkUsername = item.linkUsername;
      new Clipboard('.btn', {
        text: () => {
          return linkUsername;
        },
      });
      copiedtoast();
    },

    copyPassword(item) {
      const linkPassword = item.linkPassword;
      new Clipboard('.btn', {
        text: () => {
          return linkPassword;
        },
      });
      copiedtoast();
    },

    copyChatSecret(item) {
      const chatSecret = item.chatSecret;
      new Clipboard('.btn', {
        text: () => {
          return chatSecret;
        },
      });
      copiedtoast();
    },

    async deleteLink(item) {
      const username = item.username;
      const id = item.id;

      if (this.deleteCount === 0) {
        deleteWarnToast();
        this.deleteCount = 1;
      } else if (this.deleteCount === 1) {
        const { error } = await supabase
          .from('link')
          .delete()
          .eq(`username`, username)
          .eq(`id`, id);

        if (!error) {
          deleteItemInArrayLocally(item);
          this.deleteCount = 0;
          deletedtoast();
        } else {
          // Add rollbar
          deletionUnsuccessfullToast();
          console.log(error);
        }
      }
    },

    setItem(item) {
      store.editButtonActive = false;
      store.item = item;
    },
  },
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
