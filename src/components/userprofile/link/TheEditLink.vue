<template>
  <section>
    <button class="edit-trigger-btn" @click.prevent="showModal">
      <i class="bi bi-pencil-square"></i>
      <span>Edit</span>
    </button>
    <Teleport to="body">
      <template v-if="isModalVisible">
        <div class="edit-backdrop" @click="hideModal"></div>
        <div
          class="edit-modal"
          role="dialog"
          aria-labelledby="editModalLabel"
          aria-modal="true"
        >
          <div class="edit-modal-dialog">
            <div class="edit-modal-content">
              <div class="modal-header">
                <i class="bi bi-link-45deg modal-icon"></i>
                <h5 class="modal-title" id="editModalLabel"><b>Edit Link</b></h5>
                <button class="edit-btn-close" @click.prevent="hideModal" aria-label="Close">&times;</button>
              </div>
              <form class="modal-body" style="text-align: left">
                <div class="alert alert-info" role="alert">
                  If you enter an asterisk (*) only, the value will be deleted upon saving.
                </div>
                <LinkName :key="key" :state="currentLinkName" />
                <LinkDescription :key="key" :state="currentLinkDescription" />
                <TheCategory :key="key" :state="currentCategory" />
                <TheLink :key="key" :state="currentLink" />
                <hr />
                <pre>Optional</pre>
                <TheLinkUsername :key="key" :state="currentLinkUsername" />
                <hr />
                <pre>Optional</pre>
                <TheContactName :key="key" :state="currentContactName" />
                <TheContactPhoneNumber :key="key" :state="currentContactPhoneNumber" />
                <TheContactEmail :key="key" :state="currentContactEmail" />
                <hr />
                <pre>Optional</pre>
                <TheLinkNotes :key="key" :state="currentNotes" />
              </form>
              <div class="modal-footer d-flex justify-content-start">
                <button v-if="nBtn" class="edit-btn-save" @click.prevent="editLinkBtn">Save Changes</button>
                <LoadingButton v-if="loading" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Teleport>
  </section>
</template>

<script lang="ts">
import { encryptString } from '@/components/crypto/crypto';
import { defineComponent } from 'vue';
import { store } from '../../../store/store';
import LoadingButton from '../../buttons/TheLoadingButton.vue';
import { supabase } from '../../lib/supabaseClient';
import { updatedtoast } from '../../toasts/toasts';
import TheContactEmail from '../contacts/TheContactEmail.vue';
import TheContactName from '../contacts/TheContactName.vue';
import TheContactPhoneNumber from '../contacts/TheContactPhoneNumber.vue';
import TheCategory from './TheCategory.vue';
import TheLink from './TheLink.vue';
import LinkDescription from './TheLinkDescription.vue';
import LinkName from './TheLinkName.vue';
import TheLinkNotes from './TheLinkNotes.vue';
import TheLinkUsername from './TheLinkUsername.vue';

export default defineComponent({
  name: 'TheEditLink.vue',
  components: {
    TheLink,
    LinkName,
    LinkDescription,
    TheCategory,
    TheLinkUsername,
    LoadingButton,
    TheContactName,
    TheContactPhoneNumber,
    TheContactEmail,
    TheLinkNotes,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      currentLinkName: this.$props.item.linkname,
      currentLinkDescription: this.$props.item.linkdescription,
      currentCategory: this.$props.item.category,
      currentLink: this.$props.item.link,
      currentLinkUsername: this.$props.item.username,
      currentContactName: this.$props.item.contactname,
      currentContactPhoneNumber: this.$props.item.contactphonenumber,
      currentContactEmail: this.$props.item.contactemail,
      currentNotes: this.$props.item.notes,
      nBtn: true,
      loading: false,
      key: 1,
      encryptedLinkName: '',
      encryptedLinkDescription: '',
      encryptedLinkUsername: '',
      encryptedLink: '',
      encryptedCategory: '',
      updateString: '',
      encryptedContactName: '',
      encryptedContactPhoneNumber: '',
      encryptedContactEmail: '',
      encryptedNotes: '',

      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
      document.body.classList.add('modal-open');
    },

    hideModal() {
      this.isModalVisible = false;
      document.body.classList.remove('modal-open');
    },
    async editLinkBtn() {
      this.nBtn = false;
      this.loading = true;
      const uuID = store.getUUID();
      const id = this.item.id;

      if (store.linkname) {
        const encryptedLinkName = encryptString(store.linkname);
        this.encryptedLinkName = encryptedLinkName;

        await supabase
          .from('link')
          .update({
            linkname: encryptedLinkName,
          })
          .eq(`user_id`, uuID)
          .eq(`id`, id);
      }

      if (store.linkdescription) {
        const encryptedLinkDescription = encryptString(store.linkdescription);
        this.encryptedLinkDescription = encryptedLinkDescription;

        await supabase
          .from('link')
          .update({
            linkdescription: encryptedLinkDescription,
          })
          .eq(`user_id`, uuID)
          .eq(`id`, id);
      }

      if (store.link) {
        const encryptedLink = encryptString(store.link);
        this.encryptedLink = encryptedLink;

        await supabase
          .from('link')
          .update({
            link: encryptedLink,
          })
          .eq(`user_id`, uuID)
          .eq(`id`, id);
      }

      if (store.category) {
        const encryptedCategory = encryptString(store.category);
        this.encryptedCategory = encryptedCategory;

        await supabase
          .from('link')
          .update({
            category: encryptedCategory,
          })
          .eq(`id`, id)
          .eq(`user_id`, uuID);
      }

      if (store.linkUsername) {
        const encryptedLinkUsername = encryptString(store.linkUsername);
        this.encryptedLinkUsername = encryptedLinkUsername;

        await supabase
          .from('link')
          .update({
            linkusername: encryptedLinkUsername,
          })
          .eq(`user_id`, uuID)
          .eq(`id`, id);
      }

      if (store.contactName) {
        const encryptedContactName = encryptString(store.contactName);
        this.encryptedContactName = encryptedContactName;

        await supabase
          .from('link')
          .update({
            contactname: encryptedContactName,
          })
          .eq(`user_id`, uuID)
          .eq(`id`, id);
      }

      if (store.contactPhoneNumber) {
        const encryptedContactPhoneNumber = encryptString(store.contactPhoneNumber);
        this.encryptedContactPhoneNumber = encryptedContactPhoneNumber;

        await supabase
          .from('link')
          .update({
            contactphonenumber: encryptedContactPhoneNumber,
          })
          .eq(`user_id`, uuID)
          .eq(`id`, id);
      }

      if (store.contactEmail) {
        const encryptedContactEmail = encryptString(store.contactEmail);
        this.encryptedContactEmail = encryptedContactEmail;

        await supabase
          .from('link')
          .update({
            contactemail: encryptedContactEmail,
          })
          .eq(`user_id`, uuID)
          .eq(`id`, id);
      }

      if (store.linkNotes) {
        const encryptedNotes = encryptString(store.linkNotes);
        this.encryptedNotes = encryptedNotes;

        await supabase
          .from('link')
          .update({
            notes: encryptedNotes,
          })
          .eq(`user_id`, uuID)
          .eq(`id`, id);
      }
      this.executeCleanUp();
      await store.retieveAllLinks();
      updatedtoast();
      this.hideModal();
    },
    executeCleanUp() {
      this.nBtn = true;
      this.loading = false;
      this.key = this.key + 1;
      store.linkname = this.updateString;
      store.linkdescription = this.updateString;
      store.link = this.updateString;
      store.category = this.updateString;
      store.linkUsername = this.updateString;
      store.linkPassword = this.updateString;
      store.contactName = this.updateString;
      store.contactPhoneNumber = this.updateString;
      store.contactEmail = this.updateString;
      store.linkNotes = this.updateString;
      this.encryptedLinkName = '';
      this.encryptedLinkDescription = '';
      this.encryptedCategory = '';
      this.encryptedLink = '';
      this.encryptedLinkUsername = '';
      this.encryptedContactName = '';
      this.encryptedContactPhoneNumber = '';
      this.encryptedContactEmail = '';
      this.encryptedNotes = '';
    },
  },
});
</script>

<style scoped>
.edit-trigger-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border: 1.5px solid rgba(95, 127, 255, 0.3);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #5F7FFF;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.edit-trigger-btn:hover {
  background: rgba(95, 127, 255, 0.08);
  border-color: #5F7FFF;
}
</style>

<style>
.edit-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  z-index: 1055;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.edit-modal {
  position: fixed;
  inset: 0;
  z-index: 1060;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.edit-modal-dialog {
  width: 100%;
  max-width: 520px;
}

.edit-modal-content {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.28);
  display: flex;
  flex-direction: column;
  max-height: 88vh;
  overflow: hidden;
}

.edit-modal-content .modal-header {
  background: linear-gradient(135deg, #5F7FFF 0%, #8fa6ff 100%);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  padding: 1rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.edit-modal-content .modal-title,
.edit-modal-content .modal-header b {
  color: #fff;
}

.modal-icon {
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
}

.edit-btn-close {
  background: rgba(255, 255, 255, 0.22);
  border: none;
  color: #fff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  margin-left: auto;
  flex-shrink: 0;
}

.edit-btn-close:hover {
  background: rgba(255, 255, 255, 0.38);
}

.edit-modal-content .modal-body {
  overflow-y: auto;
  flex: 1;
  padding: 1.2rem 1.4rem;
}

.edit-modal-content .modal-footer {
  padding: 0.8rem 1.4rem 1.1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  background: #fafbff;
  border-radius: 0 0 20px 20px;
}

.edit-btn-save {
  background: linear-gradient(135deg, #5F7FFF 0%, #8fa6ff 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 9px 26px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.15s, box-shadow 0.15s;
  box-shadow: 0 4px 14px rgba(95, 127, 255, 0.4);
  letter-spacing: 0.01em;
}

.edit-btn-save:hover {
  opacity: 0.9;
  box-shadow: 0 6px 20px rgba(95, 127, 255, 0.55);
}
</style>
