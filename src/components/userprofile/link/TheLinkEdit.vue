<template>
    <section>
        <LinkIcon data-bs-target="#editLink" data-bs-toggle="modal" class="text" />
        <i class="text" data-bs-target="#editLink" data-bs-toggle="modal"></i>
        <div class="modal fade" id="editLink" tabindex="-1" aria-labelledby="linkyModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
                    <div class="modal-header">
                        <LinkIcon />
                        <h5 class="modal-title" id="linkyModalLabel"><b>EditLink</b></h5>
                        <CloseModalButton />
                    </div>
                    <form class="modal-body">
                        <LinkName :key="key"></LinkName>
                        <LinkDescription :key="key"></LinkDescription>
                        <TheCategory :key="key"></TheCategory>
                        <TheLink :key="key"></TheLink>
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

export default defineComponent({
  name: 'TheLinkEdit.vue',
  components: {
    TheLink,
    LinkName,
    LinkDescription,
    TheCategory,
    TheEditIcon,
    AddBtn,
    CloseModalButton,
    LoadingButton,
    LinkIcon,
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      key: 1,
    };
  },
  methods: {
    textEncoder(linkPassword: string) {
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(linkPassword);
      const hexString = Array.from(uint8Array, (byte) => byte.toString(16).padStart(2, '0')).join(
        '',
      );
      return hexString;
    },

    async editLinkBtn() {
      this.nBtn = false;
      this.loading = true;
      const username = store.username;
      const linkname = store.linkname;
      const linkdescription = store.linkdescription;
      const link = store.link;
      const category = store.category;

      const updateData: any = {
        username: username,
        linkname: linkname,
        linkdescription: linkdescription,
        link: link,
        category: category,
      };

      for (const key in updateData) {
        if (updateData[key] == null) {
          delete updateData[key];
        }
      }

      try {
        await supabase
          .from('link')
          .update(updateData)
          .then(() => {
            swal
              .fire({
                icon: 'success',
                text: `You´ve successfully updated the link ${linkname}.`,
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
        this.loading = false;
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

.btn {
  background-color: var(--primary-blue-color);
}

.text {
  cursor: pointer;
  font-size: 10px;
}
</style>
