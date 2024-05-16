<template>
  <section>
    <LinkIcon data-bs-target="#createAndSaveNewLink" data-bs-toggle="modal" class="text" />
    <i class="text" data-bs-target="#createAndSaveNewLink" data-bs-toggle="modal"
      >Create New Link</i
    >
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
import { defineComponent } from 'vue';
import { store } from '../../../store/store';
import TheLink from './TheLink.vue';
import LinkName from './TheLinkName.vue';
import LinkDescription from './TheLinkDescription.vue';
import TheCategory from './TheCategory.vue';
import swal from 'sweetalert2';
import { supabase } from '../../lib/supabaseClient';
import LinkIcon from '../../../assets/svg/TheLinkIcon.vue';
import AddBtn from '../../buttons/TheAddBtn.vue';
import CloseModalButton from '../../buttons/TheCloseModalBtn.vue';
import LoadingButton from '../../buttons/TheLoadingButton.vue';
import TheLinkUsername from './TheLinkUsername.vue';
import TheLinkPassword from './TheLinkPassword.vue';
import { encryptString } from '@/components/crypto/crypto';
import TheContactName from '../contacts/TheContactName.vue';
import TheContactPhoneNumber from '../contacts/TheContactPhoneNumber.vue';
import TheContactEmail from '../contacts/TheContactEmail.vue';
import TheLinkNotes from './TheLinkNotes.vue';

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
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      key: 1,
      encryptedLinkUsername: '',
      encryptedLinkPassword: '',
      updateString: '',
      encryptedContactName: '',
      encryptedContactPhoneNumber: '',
      encryptedContactEmail: '',
      encryptedNotes: '',
    };
  },
  methods: {
    async addNewLinkBtn() {
      this.nBtn = false;
      this.loading = true;
      const username = store.getUsername();
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

      try {
        await supabase
          .from('link')
          .insert({
            username: username,
            linkname: linkname,
            linkdescription: linkdescription,
            link: link,
            category: category,
            linkusername: this.encryptedLinkUsername,
            linkpassword: this.encryptedLinkPassword,
            contactname: this.encryptedContactName,
            contactphonenumber: this.encryptedContactPhoneNumber,
            contactemail: this.encryptedContactEmail,
            notes: this.encryptedNotes,
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
                this.executeCleanUp();
                store.retieveAllLinks();
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
}
</style>
