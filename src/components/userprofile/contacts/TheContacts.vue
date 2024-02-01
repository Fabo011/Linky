<template>
  <section>
    <ContactIcon class="text" data-bs-toggle="modal" data-bs-target="#vcfModal" />
    <i class="text" data-bs-toggle="modal" data-bs-target="#vcfModal"> Open your Contact</i>

    <div
      class="modal fade"
      id="vcfModal"
      tabindex="-1"
      aria-labelledby="vcfModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="vcfModalLabel"><b>Contacts</b></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="contact in store.contacts" :key="store.contacts.id">
                  <td>{{ contact.name }}</td>
                  <td>
                    <a :href="'tel:' + contact.phone">{{ contact.phone }}</a>
                  </td>
                  <td>
                    <a href="mailto:{{ contact.email }}">{{ contact.email }}</a>
                  </td>
                  <button
                    class="btn btndelete btn-danger btn-sm"
                    @click.prevent="deleteContact(contact)"
                  >
                    <TheTrashIcon />
                  </button>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { store } from '@/store/store';
import ContactIcon from '../../../assets/svg/TheContactIcon.vue';
import TheTrashIcon from '@/assets/svg/TheTrashIcon.vue';
import { supabase } from '@/components/lib/supabaseClient';
import TheClipboardIcon from '@/assets/svg/TheClipboardIcon.vue';
import Clipboard from 'clipboard';
import { copiedtoast } from '@/components/toasts/toasts';

export default defineComponent({
  name: 'YourComponentName',
  components: {
    ContactIcon,
    TheTrashIcon,
    TheClipboardIcon,
  },

  data() {
    return {
      store,
    };
  },

  beforeCreate() {
    store.fetchContacts();
  },

  methods: {
    async deleteContact(contact) {
      const username = store.getUsername();
      const contactName = contact.name;
      try {
        await supabase
          .from('contacts')
          .delete()
          .eq(`username`, username)
          .eq(`name`, contactName)
          .then(() => {
            store.fetchContacts();
          });
      } catch (error) {
        console.log(error);
      }
    },

    copyPhone(contact) {
      const phoneNumber = contact.phone;
      console.log(phoneNumber);
      new Clipboard('.btn', {
        text: () => {
          return phoneNumber;
        },
      });
      copiedtoast();
    },
  },
});
</script>

<style scoped>
.btndelete {
  padding: 3px;
  margin: 5px;
  margin-top: 12px;
  margin-right: 10px;
  margin-left: 25px;
}
</style>
