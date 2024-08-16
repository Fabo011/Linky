<template>
    <section>
      <LinkIcon @click="showModal" class="text" /><br>
      <i class="text" @click="showModal">Edit Link</i
      >
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
        const uuID = store.getUUID();
        const id = this.item.id;  

        if (linkname) {  
          await supabase
            .from('link')
            .update({
              linkname: linkname,
            })
            .eq('linkname', this.item.linkname)
            .eq(`user_id`, uuID).eq(`id`, id).then(() => {
              this.executeCleanUp();
              updatedtoast();
              this.hideModal();
            });
        }

        if (linkdescription) {
          const encryptedLinkDescription = encryptString(linkdescription);
          this.encryptedLinkDescription = encryptedLinkDescription;
          
          await supabase
            .from('link')
            .update({
              linkdescription: linkdescription,
            })
            .eq('linkdescription', this.item.linkdescription).eq(`user_id`, uuID).eq(`id`, id).then(() => {
              this.executeCleanUp();
              updatedtoast();
              this.hideModal();
            });
        }

        if (link) {
          const encryptedLink = encryptString(link);
          this.encryptedLink = encryptedLink;
          
          await supabase
            .from('link')
            .update({
              link: link,
            })
            .eq('link', this.item.link).eq(`user_id`, uuID).eq(`id`, id).then(() => {
              this.executeCleanUp();
              updatedtoast();
              this.hideModal();
            });
        }

        if (category) {
        const encryptedCategory = encryptString(category);
        this.encryptedCategory = encryptedCategory;

          await supabase
            .from('link')
            .update({
              category: category,
            })
            .eq('category', this.item.category).eq(`id`, id).eq(`user_id`, uuID).then(() => {
              this.executeCleanUp();
              updatedtoast();
              this.hideModal();
            });
        }
  
        if (linkusername) {
          const encryptedLinkUsername = encryptString(linkusername);
          this.encryptedLinkUsername = encryptedLinkUsername;
          
          await supabase
            .from('link')
            .update({
              linkusername: encryptedLinkUsername,
            })
            .eq(`user_id`, uuID).eq(`id`, id).then(() => {
              this.executeCleanUp();
              updatedtoast();
              this.hideModal();
            });
        }
  
        if (linkpassword) {
          const encryptedPass = encryptString(linkpassword);
          this.encryptedLinkPassword = encryptedPass;

          await supabase
            .from('link')
            .update({
              linkpassword: encryptedPass,
            })
            .eq(`user_id`, uuID).eq(`id`, id).then(() => {
              this.executeCleanUp();
              updatedtoast();
              this.hideModal();
            });
        }
  
        if (contactName) {
          const encryptedContactName = encryptString(contactName);
          this.encryptedContactName = encryptedContactName;

          await supabase
            .from('link')
            .update({
              contactname: encryptedContactName,
            })
            .eq(`user_id`, uuID).eq(`id`, id).then(() => {
              this.executeCleanUp();
              updatedtoast();
              this.hideModal();
            });
        }
  
        if (contactPhoneNumber) {
          const encryptedContactPhoneNumber = encryptString(contactPhoneNumber);
          this.encryptedContactPhoneNumber = encryptedContactPhoneNumber;

          await supabase
            .from('link')
            .update({
              contactphonenumber: encryptedContactPhoneNumber,
            })
            .eq(`user_id`, uuID).eq(`id`, id).then(() => {
              this.executeCleanUp();
              updatedtoast();
              this.hideModal();
            });
        }
  
        if (contactEmail) {
          const encryptedContactEmail = encryptString(contactEmail);
          this.encryptedContactEmail = encryptedContactEmail;

          await supabase
            .from('link')
            .update({
              contactemail: encryptedContactEmail,
            })
            .eq(`user_id`, uuID).eq(`id`, id).then(() => {
              this.executeCleanUp();
              updatedtoast();
              this.hideModal();
            });
        }
  
        if (notes) {
          const encryptedNotes = encryptString(notes);
          this.encryptedNotes = encryptedNotes;

          await supabase
            .from('link')
            .update({
              notes: encryptedNotes,
            })
            .eq(`user_id`, uuID).eq(`id`, id).then(() => {
              this.executeCleanUp();
              updatedtoast();
              this.hideModal();
            });
        }
  
        if (files) {
          const filename = await uploadFile();
          this.filename = filename;
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
    font-size: 8px;
  }
  #editLink {
    margin-top: 30px;
  }

  </style>