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
                  <td>{{ contact.email }}</td>
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

export default defineComponent({
  name: 'YourComponentName',
  components: {
    ContactIcon,
  },

  data() {
    return {
      store,
      contacts: [],
    };
  },

  beforeCreate() {
    store.fetchContacts();
  },
});
</script>
