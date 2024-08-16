<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-contact-email" class="d-block d-flex align-items-center">
        <b>Contact Email</b>
      </label>
      <input
        v-model="contactEmail"
        @input="set"
        placeholder="example@skiff.com"
        autocomplete="off"
        maxlength="50"
        class="w-100"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { store } from '@/store/store';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      contactEmail: '',
    };
  },

  methods: {
    set() {
      store.contactEmail = this.contactEmail;
    },
  },
});
</script>
<style>
#mark-counter {
  background-color: #ffff;
  font-size: 10px;
}

input:focus {
  outline: none;
  box-shadow: none;
}
</style>
