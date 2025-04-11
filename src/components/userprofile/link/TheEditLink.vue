<template>
  <section>
    <LinkIcon @click="showModal" class="text" /><br />
    <i class="text" @click="showModal">Edit Link</i>
    <div
      :class="['modal', { 'show d-block': isModalVisible }]"
      id="editLink"
      tabindex="-1"
      aria-labelledby="linkyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <LinkIcon />
            <h5 class="modal-title" id="linkyModalLabel"><b>Edit Link</b></h5>
            <CloseModalButton @click="hideModal" />
          </div>
          <form class="modal-body" style="text-align: left">
            <LinkName :key="key" :state="currentLinkName" />
            <LinkDescription :key="key" :state="currentLinkDescription" />
            <TheCategory :key="key" :state="currentCategory" />
            <TheLink :key="key" :state="currentLink" />
            <hr />
            <pre>Optional</pre>
            <TheLinkUsername :key="key" :state="currentLinkUsername" />
            <TheLinkPassword :key="key" :state="currentLinkPassword" />
            <hr />
            <pre>Optional</pre>
            <TheContactName :key="key" :state="currentContactName" />
            <TheContactPhoneNumber :key="key" :state="currentContactPhoneNumber" />
            <TheContactEmail :key="key" :state="currentContactEmail" />
            <hr />
            <pre>Optional</pre>
            <TheLinkNotes :key="key" :state="currentNotes" />
            <hr />
            <pre>Optional</pre>
            <TheUploadEncryptedFiles :key="key" :state="currentFilename" />
          </form>
          <div class="modal-footer d-flex justify-content-start">
            <AddBtn v-if="nBtn" @click.prevent="editLinkBtn"> Add </AddBtn>
            <LoadingButton v-if="loading" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { encryptString } from '@/components/crypto/crypto';
import { getAccountSize } from '@/components/lib/account';
import { defineComponent } from 'vue';
import LinkIcon from '../../../assets/svg/TheLinkIcon.vue';
import { store } from '../../../store/store';
import AddBtn from '../../buttons/TheAddBtn.vue';
import CloseModalButton from '../../buttons/TheCloseModalBtn.vue';
import LoadingButton from '../../buttons/TheLoadingButton.vue';
import { supabase } from '../../lib/supabaseClient';
import { updatedtoast } from '../../toasts/toasts';
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
  name: 'TheEditLink.vue',
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
      currentLinkPassword: this.$props.item.password,
      currentContactName: this.$props.item.contactname,
      currentContactPhoneNumber: this.$props.item.contactphonenumber,
      currentContactEmail: this.$props.item.contactemail,
      currentNotes: this.$props.item.notes,
      currentFilename: this.$props.item.filename,
      nBtn: true,
      loading: false,
      key: 1,
      encryptedLinkName: '',
      encryptedLinkDescription: '',
      encryptedLinkUsername: '',
      encryptedLink: '',
      encryptedCategory: '',
      encryptedLinkPassword: '',
      updateString: '',
      encryptedContactName: '',
      encryptedContactPhoneNumber: '',
      encryptedContactEmail: '',
      encryptedNotes: '',
      filename: '',

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

      if (store.linkPassword) {
        const encryptedPass = encryptString(store.linkPassword);
        this.encryptedLinkPassword = encryptedPass;

        await supabase
          .from('link')
          .update({
            linkpassword: encryptedPass,
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

      if (store.files && store.files.length > 0) {
        const maxSize = 150;
        const { mb, gb, totalSizeInMB } = await getAccountSize();

        let uploadSize = store.files[0].size / (1024 * 1024);

        const totalSizeAfterUpload = totalSizeInMB + uploadSize;

        if (totalSizeAfterUpload < maxSize) {
          const filename = await uploadFile();
          const encryptedFilename = encryptString(filename);
          this.filename = encryptedFilename;

          await supabase
            .from('link')
            .update({
              filename: encryptedFilename,
            })
            .eq(`user_id`, uuID)
            .eq(`id`, id);
        }
      }
      this.executeCleanUp();
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
  margin-top: 15px;
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
  font-size: 8px;
}
#editLink {
  margin-top: 30px;
}

#editLink {
  margin-top: 60px;
  max-height: 85%;
}
</style>
