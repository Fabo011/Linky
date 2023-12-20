<template>
  <section>
    <TheShareIcon data-bs-target="#shareChat" data-bs-toggle="modal" class="text" />
    <i class="text" data-bs-target="#shareChat" data-bs-toggle="modal"></i>
    <div
      class="modal fade"
      id="shareChat"
      tabindex="-1"
      aria-labelledby="shareChatModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <TheShareIcon />
            <h5 class="modal-title" id="shareChatModalLabel ms-4"><b>Share Chat</b></h5>
            <CloseModalButton />
          </div>
          <form class="modal-body">
            <TheFriendUsername :key="key" />
          </form>
          <div class="modal-footer d-flex justify-content-start">
            <AddBtn v-if="nBtn" @click.prevent="shareChatBtn()"> Share </AddBtn>
            <LoadingButton v-if="loading" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../../store/store';
import TheShareIcon from '@/assets/svg/TheShareIcon.vue';
import TheFriendUsername from '@/components/userprofile/TheFriendUsername.vue';
import swal from 'sweetalert2';
import { supabase } from '../../lib/supabaseClient';
import AddBtn from '../../buttons/TheAddBtn.vue';
import CloseModalButton from '../../buttons/TheCloseModalBtn.vue';
import LoadingButton from '../../buttons/TheLoadingButton.vue';

export default defineComponent({
  name: 'TheLinkEdit.vue',
  components: {
    TheShareIcon,
    TheFriendUsername,
    AddBtn,
    CloseModalButton,
    LoadingButton,
  },

  props: {
    item: Object
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      key: 1,
    };
  },
  methods: {
    async shareChatBtn() {
      const item = this.item as any;

      this.nBtn = false;
      this.loading = true;
      const username = store.friendUsername;
      const email = username.toLowerCase() + '@linky.com';

      const data = {
        username: username,
        email: email,
        linkname: item.linkname,
        linkdescription: item.linkdescription,
        category: item.category,
        link: item.link,
        chatRoom: item.chatRoom,
        chatKey: item.chatKey,
        iv: item.iv,
      };

      try {
        await supabase
          .from('link')
          .insert(data)
          .then(() => {
            swal
              .fire({
                icon: 'success',
                text: `You´ve successfully shared the chat ${data.linkname}.`,
                timer: 1500,
                showConfirmButton: false,
              })
              .then(() => {
                this.executeCleanUp();
                store.retieveAllLinks();
              });
          });
      } catch (error) {
        this.executeCleanUp();
        console.log(error);
      }
    },

    executeCleanUp() {
      this.key = this.key + 1;
      this.nBtn = true;
      this.loading = false;
    },
  },
});
</script>

<style scoped>
#plus {
  cursor: pointer;
  margin-left: 9%;
}

#space-top {
  margin-top: 6px;
}

#mark-security {
  background-color: #ffff;
  font-size: 10px;
  margin-top: 10px;
}

.btn {
  background-color: var(--primary-blue-color);
}
.modal-title {
  margin-left: 5px;
}
</style>
