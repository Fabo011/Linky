<template>
  <section>
    <TheEncryFileIcon data-bs-target="#uploadEncFiles" data-bs-toggle="modal" class="text" />
    <i class="text cursor-pointer" data-bs-target="#uploadEncFiles" data-bs-toggle="modal">
      Upload Files
    </i>
    <div
      class="modal fade"
      id="uploadEncFiles"
      tabindex="-1"
      aria-labelledby="uploadEncFileModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <TheEncryFileIcon />
            <h5 class="modal-title" id="uploadEncFileModalLabel"><b>Upload Encrypted File/s</b></h5>
            <TheCloseModalBtn />
          </div>
          <form class="modal-body">
            <TheCategory />

            <div class="container">
              <label for="fileInput" class="form-label"><b>Choose File(s)</b></label>
              <input
                :key="key"
                type="file"
                id="fileInput"
                ref="fileInput"
                multiple
                @change="handleFileChange"
                class="form-control"
              />
            </div>
          </form>
          <div class="modal-footer d-flex justify-content-start">
            <TheAddBtn v-if="nBtn" @click.prevent="upload()"> Upload </TheAddBtn>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store/store';
import TheAddBtn from '@/components/buttons/TheAddBtn.vue';
import TheEncryFileIcon from '@/assets/svg/TheEncryFileIcon.vue';
import TheCloseModalBtn from '@/components/buttons/TheCloseModalBtn.vue';
import { supabase } from '@/components/lib/supabaseClient';
import { addedtoast } from '@/components/toasts/toasts';
import { errorToast, errorToastFileUploadNoMembership } from '@/components/toasts/toasts';
import TheCategory from '@/components/userprofile/link/TheCategory.vue';
import { encryptFile } from '@/components/crypto/crypto';
import { checkStorageLimit } from '@/components/lib/account';
import swal from 'sweetalert2';

export default defineComponent({
  name: 'TheUploadEncryFiles.vue',
  components: {
    TheAddBtn,
    TheEncryFileIcon,
    TheCloseModalBtn,
    TheCategory,
  },
  data() {
    return {
      files: [] as any,
      nBtn: true,
      loading: false,
      key: 1,
      username: store.getUsername(),
      uuid: store.getUUID(),
      updateString: '',
    };
  },
  methods: {
    handleFileChange() {
      // @ts-ignore
      this.files = this.$refs.fileInput.files;
    },

    async upload() {
      this.userInformation()

      try {
        const account = await checkStorageLimit();

        if (account === true) {
          await this.uploadFiles();
        } else {
          errorToastFileUploadNoMembership();

        }
      } catch (error) {
        errorToast();
        console.error('handleFileChange Error: ' + error);
      }
    },

    async uploadFiles() {
      try {
        for (const file of this.files) {
          const encryptedFile = await encryptFile(file);
          await supabase.storage.from('linky').upload(`${this.uuid}/${file.name}`, encryptedFile);
          await this.saveNewFile(file.name);
          store.retieveAllLinks();
          this.executeCleanUp();
          addedtoast();
        }
      } catch (error) {
        this.executeCleanUp();
        errorToast();
        console.error('uploadFiles Error: ' + error);
      }
    },

    async saveNewFile(filename: string) {
      const username = this.username as string;
      const email = username.toLowerCase() + '@linky.com';
      const category = store.getCategory();
      const type = 'file';

      const linkdescription = store.linkdescription;

      const { error } = await supabase.from('link').insert({
        username: this.username,
        email: email,
        linkname: filename,
        linkdescription: linkdescription,
        category: category,
        type: type,
      });
      if (error) console.log(error);
    },

    executeCleanUp() {
      this.key = this.key + 1;
      store.linkname = this.updateString;
      store.linkdescription = this.updateString;
      store.category = this.updateString;
    },

    userInformation() {
      swal.fire({
        title: "Upload!",
        text: "Your file is uploading... Depending on the size it could take a while.",
        imageUrl: "/img/upload.png",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
        position: "bottom-end",
        showConfirmButton: false
      });
    }
  },
});
</script>
