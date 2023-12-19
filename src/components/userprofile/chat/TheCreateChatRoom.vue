<template>
  <section>
    <ChatIcon data-bs-target="#creatChatLinkModal" data-bs-toggle="modal" class="text" />
    <i class="text" data-bs-target="#creatChatLinkModal" data-bs-toggle="modal"> Create New Chat</i>
    <div
      class="modal fade"
      id="creatChatLinkModal"
      tabindex="-1"
      aria-labelledby="linkyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <ChatIcon />
            <h5 class="modal-title space" id="linkyModalLabel"><b>Create New Chat</b></h5>
            <CloseModalButton />
          </div>
          <form class="modal-body">
            <TheChatName :key="key" />
            <TheChatDescription :key="key" />
          </form>
          <div class="modal-footer d-flex justify-content-start">
            <AddBtn v-if="nBtn" @click.prevent="addNewChatBtn"> Add </AddBtn>
            <LoadingButton v-if="loading" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheChatName from './TheChatName.vue';
import TheChatDescription from './TheChatDescription.vue';
import { store } from '../../../store/store';
import { supabase } from '../../lib/supabaseClient';
import swal from 'sweetalert2';
import { chatLinkLength, chatLinkCharacters } from '../../../globalVariables';
import ChatIcon from '../../../assets/svg/TheChatIcon.vue';
import AddBtn from '../../buttons/TheAddBtn.vue';
import LoadingButton from '../../buttons/TheLoadingButton.vue';
import CloseModalButton from '../../buttons/TheCloseModalBtn.vue';
import { generateRandomKey } from '@/components/crypto/crypto';

export default defineComponent({
  name: 'TheSettings.vue',
  components: {
    TheChatName,
    TheChatDescription,
    ChatIcon,
    AddBtn,
    LoadingButton,
    CloseModalButton,
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      key: 1,
      link: '',
    };
  },

  methods: {
    generateRandomString() {
      const length = chatLinkLength;
      const characters = chatLinkCharacters;
      let result = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      this.link = result;
    },

    async addNewChatBtn() {
      this.generateRandomString();
      const { key, iv } = generateRandomKey();
      this.nBtn = false;
      this.loading = true;
      const username = store.username;
      const linkname = store.linkname;
      const linkdescription = store.linkdescription;
      const link = this.link;
      const category = 'chat';
      const chatRoom = this.link.slice(0, 60);
      const email = username.toLowerCase() + '@linky.com';

      try {
        await supabase
          .from('link')
          .insert({
            username: username,
            email: email,
            linkname: linkname,
            linkdescription: linkdescription,
            link: link,
            category: category,
            chatRoom: chatRoom,
            chatKey: key,
            iv: iv,
          })
          .then(() => {
            swal
              .fire({
                icon: 'success',
                text: `You´ve successfully saved the link ${linkname}.`,
                timer: 1500,
                showConfirmButton: false,
              })
              .then(() => {
                store.retieveAllLinks();
                this.nBtn = true;
                this.loading = false;
                this.key = this.key + 1;
              });
          });
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  },
});
</script>

<style scoped>
#plus {
  cursor: pointer;
  background-color: var(--primary-background-color);
  border-radius: 5%;
}
#space-top {
  margin-top: 6px;
}
#mark-security {
  background-color: #ffff;
  font-size: 10px;
  margin-top: 10px;
}
.space {
  margin-left: 3px;
}

.text {
  cursor: pointer;
}
</style>
