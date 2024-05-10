<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-username-email" class="d-block">
        <b>Contact Name</b>
      </label>
      <input
        v-model="contactUsername"
        @input="set"
        placeholder="Lawyer"
        autocomplete="off"
        maxlength="200"
        class="w-100"
        id="link-username-email"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store/store';

export default defineComponent({
  data() {
    return {
      contactUsername: '',
    };
  },

  methods: {
    set() {
      store.contactName = this.contactUsername;
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
