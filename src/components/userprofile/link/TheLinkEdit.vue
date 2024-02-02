<template>
  <section>
    <LinkIcon data-bs-target="#editLink" data-bs-toggle="modal" class="text" />
    <i class="text" data-bs-target="#editLink" data-bs-toggle="modal"></i>
    <div
      class="modal fade"
      id="editLink"
      tabindex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <LinkIcon />
            <h5 class="modal-title" id="editModalLabel"><b>EditLink</b></h5>
            <CloseModalButton />
          </div>
          <form class="modal-body">
            <LinkName :key="key"></LinkName>
            <LinkDescription :key="key"></LinkDescription>
            <TheCategory :key="key"></TheCategory>
            <TheLink :key="key"></TheLink>
            <TheLinkUsername :key="key" />
            <TheLinkPassword :key="key" />
          </form>
          <div class="modal-footer d-flex justify-content-start">
            <AddBtn v-if="nBtn" @click.prevent="editLinkBtn()"> Add </AddBtn>
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
import TheEditIcon from '@/assets/svg/TheEditIcon.vue';
import AddBtn from '../../buttons/TheAddBtn.vue';
import CloseModalButton from '../../buttons/TheCloseModalBtn.vue';
import LoadingButton from '../../buttons/TheLoadingButton.vue';
import LinkIcon from '../../../assets/svg/TheLinkIcon.vue';
import TheLinkUsername from './TheLinkUsername.vue';
import TheLinkPassword from './TheLinkPassword.vue';
import { encryptString } from '@/components/crypto/crypto';

export default defineComponent({
  name: 'TheLinkEdit.vue',
  components: {
    TheLink,
    LinkName,
    LinkDescription,
    TheCategory,
    TheLinkUsername,
    TheLinkPassword,
    TheEditIcon,
    AddBtn,
    CloseModalButton,
    LoadingButton,
    LinkIcon,
  },

  props: {
    item: Object,
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      key: 1,
      linkname: '',
      linkdescription: '',
      link: '',
      category: '',
      updateString: '',
      linkusername: '',
      linkpassword: '',
    };
  },
  methods: {
    async editLinkBtn() {
      const item = this.item as any;

      this.nBtn = false;
      this.loading = true;
      const username = store.username;
      const newlinkname = store.linkname;
      const newlinkdescription = store.linkdescription;
      const newlink = store.link;
      const newcategory = store.category;
      const newlinkUsername = store?.linkUsername;
      const newlinkPassword = store?.linkPassword;
      const id = item.id;
      const email = username.toLowerCase() + '@linky.com';

      if (newlinkname !== item.linkname && newlinkname !== '') {
        this.linkname = newlinkname;
      } else {
        this.linkname = item.linkname;
      }

      if (newlinkdescription !== item.linkdescription && newlinkdescription !== '') {
        this.linkdescription = newlinkdescription;
      } else {
        this.linkdescription = item.linkdescription;
      }

      if (newlink !== item.link && newlink !== '') {
        this.link = newlink;
      } else {
        this.link = item.link;
      }

      if (newcategory !== item.category && newcategory !== '') {
        this.category = newcategory;
      } else {
        this.category = item.category;
      }

      if (newlinkUsername !== item.linkUsername && newlinkUsername !== '') {
        this.linkusername = newlinkUsername;
      } else {
        this.linkusername = item.linkUsername;
      }

      if (newlinkPassword !== item.linkPassword && newlinkPassword !== '') {
        const excryptedLinkPass = encryptString(newlinkPassword);
        this.linkpassword = excryptedLinkPass;
      } else {
        this.linkpassword = item.linkPassword;
      }

      const data = {
        linkname: this.linkname,
        linkdescription: this.linkdescription,
        link: this.link,
        category: this.category,
        linkusername: this.linkusername,
        linkpassword: this.linkpassword,
      };

      const updateData: any = {
        username: username,
        email: email,
        linkname: this.linkname,
        linkdescription: this.linkdescription,
        link: this.link,
        category: this.category,
        linkusername: this.linkusername,
        linkpassword: this.linkpassword,
      };

      for (const key in updateData) {
        if (updateData[key] == null) {
          delete updateData[key];
        }
      }

      try {
        await supabase
          .from('link')
          .update(data)
          .eq(`id`, id)
          .eq(`username`, username)
          .then(() => {
            swal
              .fire({
                icon: 'success',
                text: `You´ve successfully updated the link ${this.linkname}.`,
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
        throw new Error('editLinkBtn Error: ' + error);
      }
    },

    executeCleanUp() {
      this.key = this.key + 1;
      this.nBtn = true;
      this.loading = false;
      store.linkname = this.updateString;
      store.linkdescription = this.updateString;
      store.link = this.updateString;
      store.category = this.updateString;
      store.linkUsername = this.updateString;
      store.linkPassword = this.updateString;
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

.modal-content {
  margin-top: 15%;
}

@media (max-width: 768px) {
  .modal-content {
    margin-top: 28%;
  }
}
</style>
