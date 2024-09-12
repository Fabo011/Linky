<template>
  <section>
    <div class="addLinkBtn" data-bs-target="#createAndSaveNewLink" data-bs-toggle="modal">
      <i class="text" data-bs-target="#createAndSaveNewLink" data-bs-toggle="modal">+</i>
    </div>
    <div
      class="modal fade"
      id="createAndSaveNewLink"
      tabindex="-1"
      aria-labelledby="linkyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <LinkIcon />
            <h5 class="modal-title" id="linkyModalLabel"><b>Add New Link</b></h5>
            <CloseModalButton />
          </div>
          <form class="modal-body">
            <LinkName :key="key" state="create" />
            <LinkDescription :key="key" state="create" />
            <TheCategory :key="key" state="create" />
            <TheLink :key="key" state="create" />
            <TheLinkUsername :key="key" state="create" />
            <TheLinkPassword :key="key" state="create" />
            <TheContactName :key="key" state="create" />
            <TheContactPhoneNumber :key="key" state="create" />
            <TheContactEmail :key="key" state="create" />
            <TheLinkNotes :key="key" state="create" />
            <TheUploadEncryptedFiles :key="key" state="create" />
          </form>
          <div class="modal-footer d-flex justify-content-start">
            <AddBtn v-if="nBtn" @click.prevent="addNewLinkBtn"> Add </AddBtn>
            <LoadingButton v-if="loading" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { encryptString } from '@/components/crypto/crypto';
import swal from 'sweetalert2';
import { defineComponent } from 'vue';
import LinkIcon from '../../../assets/svg/TheLinkIcon.vue';
import { store } from '../../../store/store';
import AddBtn from '../../buttons/TheAddBtn.vue';
import CloseModalButton from '../../buttons/TheCloseModalBtn.vue';
import LoadingButton from '../../buttons/TheLoadingButton.vue';
import { supabase } from '../../lib/supabaseClient';
import TheContactEmail from '../contacts/TheContactEmail.vue';
import TheContactName from '../contacts/TheContactName.vue';
import TheContactPhoneNumber from '../contacts/TheContactPhoneNumber.vue';
import TheUploadEncryptedFiles from '../filearchive/TheUploadEncryptedFiles.vue';
import { uploadFile } from '../filearchive/upload';
import TheCategory from './TheCategory.vue';
import TheLink from './TheLink.vue';
import LinkDescription from './TheLinkDescription.vue';
import LinkName from './TheLinkName.vue';
import TheLinkNotes from './TheLinkNotes.vue';
import TheLinkPassword from './TheLinkPassword.vue';
import TheLinkUsername from './TheLinkUsername.vue';

export default defineComponent({
  name: 'CreateAndSaveNewLink.vue',
  components: {
    TheLink,
    LinkName,
    LinkDescription,
    TheCategory,
    TheLinkUsername,
    TheLinkPassword,
    LinkIcon,
    AddBtn,
    CloseModalButton,
    LoadingButton,
    TheContactName,
    TheContactPhoneNumber,
    TheContactEmail,
    TheLinkNotes,
    TheUploadEncryptedFiles,
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      key: 1,
      encryptedLinkName: '',
      encryptedLinkDescription: '',
      encryptedCategory: '',
      encryptedLink: '',
      encryptedLinkUsername: '',
      encryptedLinkPassword: '',
      updateString: '',
      encryptedContactName: '',
      encryptedContactPhoneNumber: '',
      encryptedContactEmail: '',
      encryptedNotes: '',
      filename: '',
    };
  },
  methods: {
    async addNewLinkBtn() {
      this.nBtn = false;
      this.loading = true;

      if (store.linkname) {
        const encryptedLinkName = encryptString(store.linkname);
        this.encryptedLinkName = encryptedLinkName;
      }

      if (store.linkdescription) {
        const encryptedLinkDescription = encryptString(store.linkdescription);
        this.encryptedLinkDescription = encryptedLinkDescription;
      }

      if (store.category) {
        const encryptedCategory = encryptString(store.category);
        this.encryptedCategory = encryptedCategory;
      }

      if (store.link) {
        const encryptedLink = encryptString(store.link);
        this.encryptedLink = encryptedLink;
      }

      if (store.linkUsername) {
        const encryptedLinkUsername = encryptString(store.linkUsername);
        this.encryptedLinkUsername = encryptedLinkUsername;
      }

      if (store.linkPassword) {
        const encryptedPass = encryptString(store.linkPassword);
        this.encryptedLinkPassword = encryptedPass;
      }

      if (store.contactName) {
        const encryptedContactName = encryptString(store.contactName);
        this.encryptedContactName = encryptedContactName;
      }

      if (store.contactPhoneNumber) {
        const encryptedContactPhoneNumber = encryptString(store.contactPhoneNumber);
        this.encryptedContactPhoneNumber = encryptedContactPhoneNumber;
      }

      if (store.contactEmail) {
        const encryptedContactEmail = encryptString(store.contactEmail);
        this.encryptedContactEmail = encryptedContactEmail;
      }

      if (store.linkNotes) {
        const encryptedNotes = encryptString(store.linkNotes);
        this.encryptedNotes = encryptedNotes;
      }

      if (store.files) {
        const filename = await uploadFile();

        const encryptedFilename = encryptString(filename);
        this.filename = encryptedFilename;
      }

      try {
        await supabase
          .from('link')
          .insert({
            linkname: this.encryptedLinkName,
            linkdescription: this.encryptedLinkDescription,
            link: this.encryptedLink,
            category: this.encryptedCategory,
            linkusername: this.encryptedLinkUsername,
            linkpassword: this.encryptedLinkPassword,
            contactname: this.encryptedContactName,
            contactphonenumber: this.encryptedContactPhoneNumber,
            contactemail: this.encryptedContactEmail,
            notes: this.encryptedNotes,
            filename: this?.filename,
          })
          .then(() => {
            store.retieveAllLinks();
            swal
              .fire({
                icon: 'success',
                text: `You´ve successfully saved the link ${store.linkname}.`,
                timer: 1500,
                showConfirmButton: false,
              })
              .then(() => {
                this.executeCleanUp();
              });
          });
      } catch (error) {
        this.executeCleanUp();
        console.error('addNewLinkBtn Error: ' + error);
      }
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
      store.files = [];

      this.encryptedLinkName = '';
      this.encryptedLinkDescription = '';
      this.encryptedCategory = '';
      this.encryptedLink = '';
      this.encryptedLinkUsername = '';
      this.encryptedLinkPassword = '';
      this.encryptedContactName = '';
      this.encryptedContactPhoneNumber = '';
      this.encryptedContactEmail = '';
      this.encryptedNotes = '';
      this.filename = '';
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
  color: var(--primary-white-color);
}
.addLinkBtn {
  cursor: pointer;
  height: 37px;
  margin-top: 4px;
  margin-left: 3px;
  margin-right: 3px;
  border: none;
  border-radius: 5px;
  background-color: var(--primary-blue-color);
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
