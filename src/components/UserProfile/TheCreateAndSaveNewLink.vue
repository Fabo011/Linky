<template>
  <section>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-bs-toggle="modal"
      data-bs-target="#linkyModal"
      id="plus"
      width="30"
      height="30"
      fill="green"
      class="bi bi-cloud-plus-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"
      />
    </svg>

    <div
      class="modal fade"
      id="linkyModal"
      tabindex="-1"
      aria-labelledby="linkyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="green"
              class="bi bi-shield-fill-check"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
              />
            </svg>
            <h5 class="modal-title" id="linkyModalLabel"><b>ADD NEW LINK</b></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form class="modal-body">
            <LinkName :key="key"></LinkName>
            <LinkDescription :key="key"></LinkDescription>
            <TheCategory :key="key"></TheCategory>
            <TheLink :key="key"></TheLink>
          </form>
          <div class="modal-footer">
            <button
              v-if="nBtn"
              type="button"
              class="btn btn-primary"
              @click.prevent="addNewLinkBtn"
              data-bs-dismiss="modal"
            >
              Add
            </button>
            <button v-if="loading" class="btn btn-primary" type="button" disabled>
              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Loading ...
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { store } from '../../store/store';
import TheLink from '../lib/TheLink.vue';
import LinkName from './createlinkschilds/TheLinkName.vue';
import LinkDescription from './createlinkschilds/TheLinkDescription.vue';
import TheCategory from './createlinkschilds/TheCategory.vue';
import swal from 'sweetalert2';
import { supabase } from '../lib/supabaseClient';

export default defineComponent({
  name: 'CreateAndSaveNewLink.vue',
  components: { TheLink, LinkName, LinkDescription, TheCategory },

  data() {
    return {
      nBtn: true,
      loading: false,
      key: 1,
    };
  },
  methods: {
    async addNewLinkBtn() {
      this.nBtn = false;
      this.loading = true;
      const username = store.username;
      const linkname = store.linkname;
      const linkdescription = store.linkdescription;
      const link = store.link;
      const category = store.category;

      try {
        await supabase
          .from('link')
          .insert({
            username: username,
            linkname: linkname,
            linkdescription: linkdescription,
            link: link,
            category: category,
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
                store.retieveAllLinks();
                this.nBtn = true;
                this.loading = false;
                this.key = this.key + 1;
              });
          });
      } catch (error) {
        console.log(error);
      }
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
</style>
