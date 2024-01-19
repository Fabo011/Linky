<template>
  <button v-if="item.category !== 'chat' && item.type !== 'file'" class="btn share">
    <a :href="item.link" target="_blank" class="btn btn-sm openlink">
      <TheChatBtnIcon /><br />
      <span class="clipboard">Link</span>
    </a>
  </button>

  <button
    v-if="item.category !== 'chat' && item.type !== 'file'"
    class="btn share"
    @click.prevent="copyLink(item)"
  >
    <TheClipboardIcon /><br />
    <span class="clipboard">Copy Link</span>
  </button>

  <button
    v-if="item.linkusername !== '' && item.category !== 'chat'"
    class="btn share"
    @click.prevent="copyUsername(item)"
  >
    <TheUsernameIcon /><br />
    <span class="clipboard">Copy Username</span>
  </button>

  <button
    v-if="item.linkpassword !== '' && item.category !== 'chat'"
    class="btn share"
    @click.prevent="copyPassword(item)"
  >
    <TheCopyPasswordIcon /><br />
    <span class="clipboard">Copy Password</span>
  </button>

  <button v-if="item.category !== 'chat' && item.type !== 'file'" class="btn share">
    <TheLinkEdit :item="item" />
    <span class="clipboard">Edit Link</span>
  </button>
</template>
<script>
import { store } from '../../../../store/store';
import { defineComponent } from 'vue';
import { copiedtoast } from '@/components/toasts/toasts';
import { decryptString } from '@/components/crypto/crypto';
import TheClipboardIcon from '@/assets/svg/TheClipboardIcon.vue';
import TheUsernameIcon from '@/assets/svg/TheUsernameIcon.vue';
import TheCopyPasswordIcon from '@/assets/svg/TheCopyPasswordIcon.vue';
import TheLinkEdit from '../TheLinkEdit.vue';
import Clipboard from 'clipboard';
import TheChatBtnIcon from '@/assets/svg/TheChatBtnIcon.vue';

export default defineComponent({
  name: 'TheRetrieveAllLinksLinksOnly',
  components: {
    TheClipboardIcon,
    TheUsernameIcon,
    TheCopyPasswordIcon,
    TheLinkEdit,
    TheChatBtnIcon,
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
    };
  },

  methods: {
    copyLink(item) {
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

    copyUsername(item) {
      const linkUsername = item.linkusername;
      new Clipboard('.btn', {
        text: () => {
          return linkUsername;
        },
      });
      copiedtoast();
    },

    copyPassword(item) {
      const linkPassword = item.linkpassword;
      const decryptedPassword = decryptString(linkPassword);
      new Clipboard('.btn', {
        text: () => {
          return decryptedPassword;
        },
      });
      copiedtoast();
    },
  },
});
</script>
<style scoped>
.btn {
  color: var(--primary-background-color);
  color: var(--primary-white-color);
  height: 50px;
}
.share {
  color: var(--primary-background-color);
}
.clipboard {
  margin: 0;
  font-size: 8px;
}
.openlink {
  background-color: var(--primary-blue-color);
}
</style>
