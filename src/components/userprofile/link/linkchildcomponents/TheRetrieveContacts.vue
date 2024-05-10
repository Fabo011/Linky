<template>
  <div v-if="item.contactname || item.contactemail || item.contactphonenumber">
    <hr />
    <h6>Contact Informations</h6>
    <div v-if="item.contactname">
      <p class="card-text"><i class="bi bi-person icons"></i>{{ item.contactname }}</p>
    </div>

    <div v-if="item.contactemail">
      <p class="card-text"><i class="bi bi-envelope-at icons"></i>{{ item.contactemail }}</p>
    </div>

    <div v-if="item.contactphonenumber">
      <p class="card-text"><i class="bi bi-telephone icons"></i>{{ item.contactphonenumber }}</p>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheRetrieveContacts.vue',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
});
</script>
<style scoped>
.icons {
  margin-right: 3px;
}
</style>
