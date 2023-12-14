<template>
  <section>
    <TheChatIcon data-bs-target="#editChat" data-bs-toggle="modal" class="text" />
    <i class="text" data-bs-target="#editChat" data-bs-toggle="modal"></i>
    <div
      class="modal fade"
      id="editChat"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <TheChatIcon />
            <h5 class="modal-title" id="editModalLabel"><b>Edit Chat Room</b></h5>
            <TheCloseModalButton @click.prevent="setEditButtonActive()" />
          </div>
          <form class="modal-body">
            <TheLinkName :key="key" />
            <TheLinkDescription :key="key" />
          </form>
          <div class="modal-footer d-flex justify-content-start">
            <TheAddBtn v-if="nBtn" @click.prevent="editChatBtn()" />
            <TheLoadingButton v-if="loading" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store/store';
import TheLinkName from '@/components/inputs/TheLinkName.vue';
import TheLinkDescription from '@/components/inputs/TheLinkDescription.vue';
import { supabase } from '@/components/lib/supabaseClient';
import TheEditIcon from '@/assets/svg/TheEditIcon.vue';
import TheAddBtn from '@/components/buttons/TheAddBtn.vue';
import TheCloseModalButton from '@/components/buttons/TheCloseModalBtn.vue';
import TheLoadingButton from '@/components/buttons/TheLoadingButton.vue';
import TheChatIcon from '@/assets/svg/TheChatIcon.vue';
import { encryptData } from '@/components/crypto/crypto';
import { updatedtoast } from '@/components/toasts/toasts';
import { updateItemInArrayLocally } from '@/components/lib/changeItemInArrayLocally';

export default defineComponent({
  name: 'TheLinkEdit.vue',
  components: {
    TheLinkName,
    TheLinkDescription,
    TheEditIcon,
    TheAddBtn,
    TheCloseModalButton,
    TheLoadingButton,
    TheChatIcon,
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      key: 1,
      updateString: '',
      id: '',
      username: '',
    };
  },

  methods: {
    async editChatBtn() {
      this.nBtn = false;
      this.loading = true;
      const username = store.username;
      this.username = username;
      const newlinkname = store.linkname;
      const newchatdescription = store.linkdescription;
      const id = store.item.id;
      this.id = id;

      if (newlinkname !== store.item.linkname && newlinkname !== '') {
        const linkname = encryptData(newlinkname);
        this.updateLinkname(linkname);
      }

      if (newchatdescription !== store.item.linkdescription && newchatdescription !== '') {
        const linkdescription = encryptData(newchatdescription);
        this.updateLinkDescription(linkdescription);
      }
    },

    async updateLinkDescription(data: string) {
      const { error } = await supabase
        .from('link')
        .update({ linkdescription: `${data}` })
        .eq(`id`, this.id)
        .eq(`username`, this.username)
        .eq(`chatRoom`, store.item.chatRoom);

      if (!error) {
        updateItemInArrayLocally(this.id, store.linkdescription, 'linkdescription');
        this.executeCleanUp();
        updatedtoast();
      } else {
        // Add rollbar
        this.nBtn = true;
        this.loading = false;
        console.log(error);
      }
    },

    async updateLinkname(data: string) {
      const { error } = await supabase
        .from('link')
        .update({ linkname: `${data}` })
        .eq(`id`, this.id)
        .eq(`username`, this.username)
        .eq(`chatRoom`, store.item.chatRoom);

      if (!error) {
        updateItemInArrayLocally(this.id, store.linkname, 'linkname');
        this.executeCleanUp();
        updatedtoast();
      } else {
        // Add rollbar
        this.nBtn = true;
        this.loading = false;
        console.log(error);
      }
    },

    executeCleanUp() {
      this.nBtn = true;
      this.loading = false;
      this.key = this.key + 1;
      store.editButtonActive = true;
      store.linkname = this.updateString;
      store.linkdescription = this.updateString;
    },

    setEditButtonActive() {
      store.editButtonActive = true;
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

.text {
  cursor: pointer;
  font-size: 10px;
}

@media (max-width: 768px) {
  .modal-content {
    margin-top: 28%;
  }
}
</style>
@/components/lib/changeItemInArrayLocally
