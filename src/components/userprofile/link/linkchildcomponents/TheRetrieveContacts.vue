<template>
  <div v-if="item.contactname || item.contactemail || item.contactphonenumber">
    <hr />
    <h6>Contact Informations</h6>
    <div v-if="item.contactname">
      <p class="card-text">
        <i class="bi bi-person icons"></i>{{ item.contactname }}
        <i class="bi bi-clipboard copycontact" @click.prevent="copyContactName(item)"></i>
      </p>
    </div>

    <div v-if="item.contactemail">
      <p class="card-text">
        <i class="bi bi-envelope-at icons"></i>{{ item.contactemail }}
        <i class="bi bi-clipboard copycontact" @click.prevent="copyContactEmail(item)"></i>
      </p>
    </div>

    <div v-if="item.contactphonenumber">
      <p class="card-text">
        <i class="bi bi-telephone icons"></i>{{ item.contactphonenumber }}
        <i class="bi bi-clipboard copycontact" @click.prevent="copyContactPhoneNumber(item)"></i>
      </p>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { copiedtoast } from '@/components/toasts/toasts';
import Clipboard from 'clipboard';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheRetrieveContacts.vue',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  methods: {
    copyContactName(item: any) {
      const contactName = item.contactname;
      
      // @ts-ignore
      new Clipboard('.copycontact', {
        text: () => {
          return contactName;
        },
      });
      copiedtoast();
    },

    copyContactEmail(item: any) {
      const contactEmail = item.contactemail;
      // @ts-ignore
      new Clipboard('.copycontact', {
        text: () => {
          return contactEmail;
        },
      });
      copiedtoast();
    },

    copyContactPhoneNumber(item: any) {
      const contactPhoneNumber = item.contactphonenumber;
      // @ts-ignore
      new Clipboard('.copycontact', {
        text: () => {
          return contactPhoneNumber;
        },
      });
      copiedtoast();
    },
  },
});
</script>
<style scoped>
.icons {
  margin-right: 3px;
}
.copycontact {
  cursor: pointer;
}
</style>
