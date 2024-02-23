<template>
  <section>
    <ContactIcon data-bs-target="#createContactModal" data-bs-toggle="modal" class="text" />
    <i class="text" data-bs-target="#createContactModal" data-bs-toggle="modal">
      Create New Contact</i
    >
    <div
      class="modal fade"
      id="createContactModal"
      tabindex="-1"
      aria-labelledby="contactModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow p-2 mb-4 bg-body rounded border-0">
          <div class="modal-header">
            <ContactIcon />
            <h5 class="modal-title space" id="contactModalLabel"><b>Create New Contact</b></h5>
            <CloseModalButton />
          </div>
          <form class="modal-body">
            <div class="mb-3">
              <label for="contactName" class="form-label">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                class="form-control"
                id="contactName"
                v-model="contact.name"
                minlength="3"
                maxlength="40"
              />
            </div>
            <div class="mb-3">
              <label for="contactPhone" class="form-label">Phone</label>
              <input
                type="text"
                placeholder="+43 660 989898989"
                class="form-control"
                id="phone"
                name="phone"
                v-model="contact.phone"
                minlength="5"
                maxlength="30"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                placeholder="example@skiff.com"
                class="form-control"
                id="email"
                v-model="contact.email"
                minlength="5"
                maxlength="50"
                pattern=".+@example\.com"
              />
            </div>
          </form>
          <div class="modal-footer d-flex justify-content-start">
            <AddBtn v-if="nBtn" @click.prevent="addNewContactBtn"> Add </AddBtn>
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
import { supabase } from '../../lib/supabaseClient';
import swal from 'sweetalert2';
import ContactIcon from '../../../assets/svg/TheContactIcon.vue';
import AddBtn from '../../buttons/TheAddBtn.vue';
import LoadingButton from '../../buttons/TheLoadingButton.vue';
import CloseModalButton from '../../buttons/TheCloseModalBtn.vue';
import { encryptString } from '@/components/crypto/crypto';

export default defineComponent({
  name: 'TheSettings.vue',
  components: {
    ContactIcon,
    AddBtn,
    LoadingButton,
    CloseModalButton,
  },

  data() {
    return {
      nBtn: true,
      loading: false,
      key: 1,
      username: store.getUsername(),
      contact: {
        name: '',
        phone: '',
        email: '',
      },
    };
  },

  methods: {
    async addNewContactBtn() {
      try {
        const encryptedPhone = encryptString(this.contact.phone);
        const encryptedEmail = encryptString(this.contact.email);

        await supabase
          .from('contacts')
          .insert({
            username: this.username,
            name: this.contact.name,
            phone: encryptedPhone,
            email: encryptedEmail,
          })
          .then(() => {
            swal
              .fire({
                icon: 'success',
                text: `You´ve successfully saved the contact ${this.contact.name}.`,
                timer: 1500,
                showConfirmButton: false,
              })
              .then(() => {
                this.contact.name = '';
                this.contact.email = '';
                this.contact.phone = '';
                store.fetchContacts();
              });
          });
      } catch (error) {
        console.error('addNewContactBtn Error: ' + error);
      }
    },
  },
});
</script>

<style scoped>
#plus {
  cursor: pointer;
  background-color: var(--primary-background-color);
  border-radius: 5%;
}

#space-top {
  margin-top: 6px;
}

#mark-security {
  background-color: #ffff;
  font-size: 10px;
  margin-top: 10px;
}

.space {
  margin-left: 3px;
}

.text {
  cursor: pointer;
}
</style>
