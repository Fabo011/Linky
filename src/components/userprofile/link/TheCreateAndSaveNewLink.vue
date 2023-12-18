<template>
  <section>
    <TheLinkIcon data-bs-target="#createAndSaveNewLink" data-bs-toggle="modal" class="text" />
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
            <TheLinkIcon />
            <h5 class="modal-title" id="linkyModalLabel"><b>Add New Link</b></h5>
            <TheCloseModalBtn />
          </div>
          <form class="modal-body">
            <TheLinkName :key="key" />
            <TheLinkDescription :key="key" />
            <TheCategory :key="key" />
            <TheLink :key="key" />
            <TheLinkUsername :key="key" />
            <TheLinkPassword :key="key" />
          </form>
          <div class="modal-footer d-flex justify-content-start">
            <TheAddBtn v-if="nBtn" @click.prevent="addNewLinkBtn" />
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
import { addedtoast, errorToast } from '@/components/toasts/toasts';
import { supabase } from '@/components/lib/supabaseClient';
import TheLinkIcon from '@/assets/svg/TheLinkIcon.vue';
import TheAddBtn from '@/components/buttons/TheAddBtn.vue';
import TheCloseModalBtn from '@/components/buttons/TheCloseModalBtn.vue';
import TheLoadingButton from '@/components/buttons/TheLoadingButton.vue';
import TheLinkPassword from './TheLinkPassword.vue';
import { encryptData } from '@/components/crypto/crypto';
import TheLinkUsername from './TheLinkUsername.vue';

interface SaveDataTypes {
  username: string;
  linkname: string;
  linkdescription: string;
  link: string;
  category: string;
  linkUsername?: string;
  linkPassword?: string;
  chatRoom?: string;
}

export default defineComponent({
  name: 'CreateAndSaveNewLink.vue',
  components: {
    TheLink,
    TheLinkName,
    TheLinkDescription,
    TheCategory,
    TheLinkIcon,
    TheAddBtn,
    TheCloseModalBtn,
    TheLoadingButton,
    TheLinkPassword,
    TheLinkUsername,
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      updateString: '',
      key: 0,
    };
  },
  methods: {
    async addNewLinkBtn() {
      try {
         this.nBtn = false;
        this.loading = true;
        const { username } = store.getStandardUser();

        const linkname = store.linkname;
        const linkdescription = store.linkdescription;
        const link = store.link;
        const category = store.category;
        const linkUsername = store.linkUsername;
        const linkPassword = store.linkPassword;

        const data = {
          linkname: linkname,
          linkdescription: linkdescription,
          link: link,
          category: category,
          linkUsername: linkUsername,
          linkPassword: linkPassword,
        };
        const encryptedData = encryptData(data);

        const toSaveData: SaveDataTypes = {
          username: username,
          linkname: linkname,
          linkdescription: linkdescription,
          link: link,
          category: category,
          linkUsername: linkUsername,
          linkPassword: linkPassword,
        };

        const { error } = await supabase.from('links').insert({
          username: username,
          data: encryptedData,
        });

        if (!error) {
          store.items.push(toSaveData);
          this.nBtn = true;
          this.loading = false;
          this.executeCleanUp();
          addedtoast();
        } else {
          this.loading = false;
          this.executeCleanUp();
          errorToast();
        }
      } catch (error) {
        this.loading = false;
        this.executeCleanUp();
        errorToast();
      }
     
    },

    executeCleanUp() {
      this.key = this.key + 1;
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
}
</style>
