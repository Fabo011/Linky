<template>
  <section>
    <TheLinkIcon data-bs-target="#editLink" data-bs-toggle="modal" class="text" />
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
            <TheLinkIcon />
            <h5 class="modal-title" id="editModalLabel"><b>EditLink</b></h5>
            <TheCloseModalBtn @click.prevent="setEditButtonActive()" />
          </div>
          <form class="modal-body">
            <TheLinkName />
            <TheLinkDescription />
            <TheCategory />
            <TheLink />
            <TheLinkUsername />
            <TheLinkPassword />
          </form>
          <div class="modal-footer d-flex justify-content-start">
            <TheAddBtn v-if="nBtn" @click.prevent="editLinkBtn()" />
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
import TheLink from '@/components/inputs/TheLink.vue';
import TheLinkName from '@/components/inputs/TheLinkName.vue';
import TheLinkDescription from '@/components/inputs/TheLinkDescription.vue';
import TheCategory from '@/components/inputs/TheCategory.vue';
import { supabase } from '@/components/lib/supabaseClient';
import TheEditIcon from '@/assets/svg/TheEditIcon.vue';
import TheAddBtn from '@/components/buttons/TheAddBtn.vue';
import TheCloseModalBtn from '@/components/buttons/TheCloseModalBtn.vue';
import TheLoadingButton from '@/components/buttons/TheLoadingButton.vue';
import TheLinkPassword from './TheLinkPassword.vue';
import TheLinkIcon from '@/assets/svg/TheLinkIcon.vue';
import TheLinkUsername from '@/components/userprofile/link/TheLinkUsername.vue';
import { encryptData } from '@/components/crypto/crypto';
import { updatedtoast } from '@/components/toasts/toasts';
import { updateItemInArrayLocally } from '@/components/lib/changeItemInArrayLocally';

export default defineComponent({
  name: 'TheLinkEdit.vue',
  components: {
    TheLink,
    TheLinkName,
    TheLinkDescription,
    TheCategory,
    TheEditIcon,
    TheAddBtn,
    TheCloseModalBtn,
    TheLoadingButton,
    TheLinkPassword,
    TheLinkIcon,
    TheLinkUsername,
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      updateString: '',
      id: '',
      username: '',
    };
  },

  methods: {
    async editLinkBtn() {
      this.nBtn = false;
      this.loading = true;
      const username = store.username;
      this.username = username;
      const newlinkname = store.linkname;
      const newlinkdescription = store.linkdescription;
      const newlink = store.link;
      const newcategory = store.category;
      const newlinkUsername = store.linkUsername;
      const newlinkPassword = store.linkPassword;
      const id = store.item.id;
      this.id = id;

      if (newlinkname !== store.item.linkname && newlinkname !== '') {
        const linkname = encryptData(newlinkname);
        this.updateLinkname(linkname);
      }

      if (newlinkdescription !== store.item.linkdescription && newlinkdescription !== '') {
        const linkdescription = encryptData(newlinkdescription);
        this.updateLinkDescription(linkdescription);
      }

      if (newlink !== store.item.link && newlink !== '') {
        const link = encryptData(newlink);
        this.updateLink(link);
      }

      if (newcategory !== store.item.category && newcategory !== '') {
        const category = encryptData(newcategory);
        this.updateCategory(category);
      }

      if (newlinkPassword !== store.item.linkPassword && newlinkPassword !== '') {
        const linkPassword = encryptData(newlinkPassword);
        this.updateLinkPassword(linkPassword);
      }

      if (newlinkUsername !== store.item.linkUsername && newlinkUsername !== '') {
        const linkUsername = encryptData(newlinkUsername);
        this.updateLinkUsername(linkUsername);
      }
    },

    async updateLinkDescription(data: string) {
      const { error } = await supabase
        .from('link')
        .update({ linkdescription: `${data}` })
        .eq(`id`, this.id)
        .eq(`username`, this.username);

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
        .eq(`username`, this.username);

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

    async updateLink(data: string) {
      const { error } = await supabase
        .from('link')
        .update({ link: `${data}` })
        .eq(`id`, this.id)
        .eq(`username`, this.username);

      if (!error) {
        updateItemInArrayLocally(this.id, store.link, 'link');
        this.executeCleanUp();
        updatedtoast();
      } else {
        // Add rollbar
        this.nBtn = true;
        this.loading = false;
        console.log(error);
      }
    },

    async updateCategory(data: string) {
      const { error } = await supabase
        .from('link')
        .update({ category: `${data}` })
        .eq(`id`, this.id)
        .eq(`username`, this.username);

      if (!error) {
        updateItemInArrayLocally(this.id, store.category, 'category');
        this.executeCleanUp();
        updatedtoast();
      } else {
        // Add rollbar
        this.nBtn = true;
        this.loading = false;
        console.log(error);
      }
    },

    async updateLinkPassword(data: string) {
      const { error } = await supabase
        .from('link')
        .update({ linkPassword: `${data}` })
        .eq(`id`, this.id)
        .eq(`username`, this.username);

      if (!error) {
        updateItemInArrayLocally(this.id, store.linkPassword, 'linkPassword');
        this.executeCleanUp();
        updatedtoast();
      } else {
        // Add rollbar
        this.nBtn = true;
        this.loading = false;
        console.log(error);
      }
    },

    async updateLinkUsername(data: string) {
      const { error } = await supabase
        .from('link')
        .update({ linkUsername: `${data}` })
        .eq(`id`, this.id)
        .eq(`username`, this.username);

      if (!error) {
        updateItemInArrayLocally(this.id, store.linkUsername, 'linkUsername');
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
      store.editButtonActive = true;
      store.linkname = this.updateString;
      store.linkdescription = this.updateString;
      store.link = this.updateString;
      store.category = this.updateString;
      store.linkUsername = this.updateString;
      store.linkPassword = this.updateString;
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
