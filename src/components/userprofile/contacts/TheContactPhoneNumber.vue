<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-username-email" class="d-block d-flex align-items-center">
        <b>Contact Phone Number</b>
      </label>
      <input
        v-model="contactPhoneNumber"
        @input="set"
        placeholder="+43 660 989898989"
        autocomplete="off"
        maxlength="35"
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
      contactPhoneNumber: '',
    };
  },

  methods: {
    set() {
      store.contactPhoneNumber = this.contactPhoneNumber;
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
