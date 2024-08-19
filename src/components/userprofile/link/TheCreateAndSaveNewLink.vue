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
            <LinkName :key="key" />
            <LinkDescription :key="key" />
            <TheCategory :key="key" />
            <TheLink :key="key" />
            <TheLinkUsername :key="key" />
            <TheLinkPassword :key="key" />
            <TheContactName :key="key" />
            <TheContactPhoneNumber :key="key" />
            <TheContactEmail :key="key" />
            <TheLinkNotes :key="key" />
            <TheUploadEncryptedFiles :key="key" />
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
      encrypredLinkDescription: '',
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
      const linkname = store.linkname;
      const linkdescription = store.linkdescription;
      const link = store.link;
      const category = store.category;
      const linkusername = store?.linkUsername;
      const linkpassword = store?.linkPassword;
      const contactName = store?.contactName;
      const contactPhoneNumber = store?.contactPhoneNumber;
      const contactEmail = store?.contactEmail;
      const notes = store?.linkNotes;
      const files = store?.files;

      if (linkname) {
        const encryptedLinkName = encryptString(linkname);
        this.encryptedLinkName = encryptedLinkName;
      }

      if (linkdescription) {
        const encryptedLinkDescription = encryptString(linkdescription);
        this.encrypredLinkDescription = encryptedLinkDescription;
      }

      if (category) {
        const encryptedCategory = encryptString(category);
        this.encryptedCategory = encryptedCategory;
      }

      if (link) {
        const encryptedLink = encryptString(link);
        this.encryptedLink = encryptedLink;
      }

      if (linkusername) {
        const encryptedLinkUsername = encryptString(linkusername);
        this.encryptedLinkUsername = encryptedLinkUsername;
      }

      if (linkpassword) {
        const encryptedPass = encryptString(linkpassword);
        this.encryptedLinkPassword = encryptedPass;
      }

      if (contactName) {
        const encryptedContactName = encryptString(contactName);
        this.encryptedContactName = encryptedContactName;
      }

      if (contactPhoneNumber) {
        const encryptedContactPhoneNumber = encryptString(contactPhoneNumber);
        this.encryptedContactPhoneNumber = encryptedContactPhoneNumber;
      }

      if (contactEmail) {
        const encryptedContactEmail = encryptString(contactEmail);
        this.encryptedContactEmail = encryptedContactEmail;
      }

      if (notes) {
        const encryptedNotes = encryptString(notes);
        this.encryptedNotes = encryptedNotes;
      }

      if (files) {
        const filename = await uploadFile();
        this.filename = filename;
      }

      try {
        await supabase
          .from('link')
          .insert({
            linkname: this.encryptedLinkName,
            linkdescription: this.encrypredLinkDescription,
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
                text: `You´ve successfully saved the link ${linkname}.`,
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
