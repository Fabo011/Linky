<template>
  <section>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="#5F7FFF"
      class="bi bi-chat-square-fill"
      viewBox="0 0 16 16"
      data-bs-toggle="modal"
      data-bs-target="#settingsModal"
      id="plus"
    >
      <path
        d="M14 0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-4 3v-3H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zm0 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5.293l1.353 1.015a1 1 0 0 0 1.225-1.53L8 11l5-3H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
      />
    </svg>

    <div
      class="modal fade"
      id="settingsModal"
      tabindex="-1"
      aria-labelledby="linkyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="#5F7FFF"
              class="bi bi-chat-square-fill"
              viewBox="0 0 16 16"
              data-bs-toggle="modal"
              data-bs-target="#settingsModal"
            >
              <path
                d="M14 0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-4 3v-3H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zm0 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5.293l1.353 1.015a1 1 0 0 0 1.225-1.53L8 11l5-3H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"
              />
            </svg>
            <h5 class="modal-title space" id="linkyModalLabel"><b>Create New Chat</b></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form class="modal-body">
            <TheChatName :key="key" />
            <TheChatDescription :key="key" />
          </form>
          <div class="modal-footer d-flex justify-content-start">
              <button
                v-if="nBtn"
                type="button"
                class="btn btn-primary"
                @click.prevent="addNewChatBtn"
                data-bs-dismiss="modal"
              >
                Add
              </button>
              <button v-if="loading" class="btn btn-primary" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading ...
              </button>
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
import { chatLinkLength, chatLinkCharacters, linkyChatUrl } from '../../../globalVariables';

export default defineComponent({
  name: 'TheSettings.vue',
  components: { TheChatName, TheChatDescription },

  data() {
    return {
      nBtn: true,
      loading: false,
      key: 1,
      link: ''
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
      const link = linkyChatUrl+this.link;
      const category = 'chat';

      try {
        await supabase
          .from('link')
          .insert({
            username: username,
            linkname: linkname,
            linkdescription: linkdescription,
            link: link,
            category: category,
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
</style>
