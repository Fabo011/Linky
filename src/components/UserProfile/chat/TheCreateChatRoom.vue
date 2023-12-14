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
            <TheLinkName />
            <TheLinkDescription />
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
import TheLinkName from '@/components/inputs/TheLinkName.vue';
import TheLinkDescription from '@/components/inputs/TheLinkDescription.vue';
import { store } from '../../../store/store';
import { supabase } from '../../lib/supabaseClient';
import { chatLinkLength, chatLinkCharacters, linkyChatUrl } from '../../../globalVariables';
import ChatIcon from '../../../assets/svg/TheChatIcon.vue';
import AddBtn from '../../buttons/TheAddBtn.vue';
import LoadingButton from '../../buttons/TheLoadingButton.vue';
import CloseModalButton from '../../buttons/TheCloseModalBtn.vue';
import { encryptData, generateRandomChatKey } from '@/components/crypto/crypto';
import { addedtoast } from '@/components/toasts/toasts';

export default defineComponent({
  name: 'TheCreateChatRoom.vue',
  components: {
    TheLinkName,
    TheLinkDescription,
    ChatIcon,
    AddBtn,
    LoadingButton,
    CloseModalButton,
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      link: '',
      updateString: '',
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
      this.nBtn = false;
      this.loading = true;
      const username = store.username;
      const linkname = store.linkname;
      const linkdescription = store.linkdescription;
      const link = linkyChatUrl + this.link;
      const category = 'chat';
      const chatRoom = this.link.slice(0, 60);
      const chatSecret = generateRandomChatKey();

      const encryptedLinkName = encryptData(linkname);
      const encryptedLinkDescription = encryptData(linkdescription);
      const encryptedLink = encryptData(link);
      const encryptedCategory = encryptData(category);
      const encryptedChatSecret = encryptData(chatSecret);

      const toSaveData = {
        linkname: linkname,
        linkdescription: linkdescription,
        link: link,
        category: category,
        chatRoom: chatRoom,
        chatSecret: chatSecret,
      };

      const { error } = await supabase.from('link').insert({
        username: username,
        linkname: encryptedLinkName,
        linkdescription: encryptedLinkDescription,
        link: encryptedLink,
        category: encryptedCategory,
        chatRoom: chatRoom,
        chatSecret: encryptedChatSecret,
      });

      if (!error) {
        store.items.push(toSaveData);
        this.executeCleanUp();
        addedtoast();
      } else {
        this.nBtn = true;
        this.loading = false;
        this.executeCleanUp();
      }
    },

    executeCleanUp() {
      store.linkname = this.updateString;
      store.linkdescription = this.updateString;
      store.link = this.updateString;
      store.category = this.updateString;
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
