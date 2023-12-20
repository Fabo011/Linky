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
            <h5 class="modal-title" id="uploadEncFileModalLabel"><b>Upload Encrypted File</b></h5>
            <TheCloseModalBtn />
          </div>
          <form class="modal-body">
            <div class="mb-3">
              <label for="saveOption" class="form-label"><b>Choose Storage Location</b></label>
              <select :key="key" id="saveOption" class="form-select" v-model="mode">
                <option value="CloudOnly">Cloud Only</option>
                <option value="CloudAndNas">Cloud & Nas</option>
                <option value="NasOnly">Nas Only</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="anotherSwitch" class="form-label"
                ><b>Shall we encrypt your file/s?</b></label
              ><br />
              <small v-if="encryptionMode === false" class="text-danger"
                >Please enable encryption for sensitive files.</small
              >
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="anotherSwitch"
                  v-model="encryptionMode"
                />
                <span>{{ encryptionMode }}</span>
              </div>
            </div>

            <div class="mb-3">
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
            <TheAddBtn v-if="nBtn" @click.prevent="uploadEncFilesBtn()"> Upload </TheAddBtn>
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
import TheAddBtn from '@/components/buttons/TheAddBtn.vue';
import TheLoadingButton from '@/components/buttons/TheLoadingButton.vue';
import TheEncryFileIcon from '@/assets/svg/TheEncryFileIcon.vue';
import TheCloseModalBtn from '@/components/buttons/TheCloseModalBtn.vue';
import { supabase } from '@/components/lib/supabaseClient';
import { addedtoast } from '@/components/toasts/toasts';
import { errorToast } from '@/components/toasts/toasts';

export default defineComponent({
  name: 'TheUploadEncryFiles.vue',
  components: {
    TheAddBtn,
    TheLoadingButton,
    TheEncryFileIcon,
    TheCloseModalBtn,
  },
  data() {
    return {
      files: [] as any,
      nBtn: true,
      loading: false,
      mode: 'CloudOnly',
      key: 1,
      encryptionMode: false,
    };
  },
  methods: {
    handleFileChange() {
      // @ts-ignore
      this.files = this.$refs.fileInput.files;
    },
    async uploadEncFilesBtn() {
      if (this.mode === 'CloudOnly') {
        this.uploadCloudOnly();
      } else if (this.mode === 'CloudAndNas') {
        this.uploadCloudAndNas();
      } else if (this.mode === 'NasOnly') {
        this.uploadNasOnly();
      }
    },

    async uploadCloudOnly() {
      const username = store.getUsername();  

      try {
        for (const file of this.files) {
          if (this.encryptionMode === true) {
            // #TODO: Encrypt files
            await supabase.storage
              .from('linky')
              .upload(`${username}/${file.name}`, file);
            this.executeCleanUp();
            addedtoast();
          } else {
            await supabase.storage
              .from('linky')
              .upload(`${username}/${file.name}`, file);
            this.executeCleanUp();
            addedtoast();
          }
        }
      } catch (error) {
        this.executeCleanUp();
        errorToast();
        console.trace('Error during file upload:', error);
      }
    },

    async uploadCloudAndNas() {
      console.log('UploadCloudAndNas');
    },

    async uploadNasOnly() {
      console.log('UploadNasOnly');
    },

    executeCleanUp() {
      this.nBtn = true;
      this.loading = false;
      this.key = this.key + 1;
    },
  },
});
</script>

<style scoped>
/* Add your custom styles or Bootstrap classes here */
</style>
