<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-username-name" class="d-block d-flex align-items-center">
        <b>Contact Name</b>
      </label>
      <input
        v-model="contactUsername"
        @input="set"
        placeholder="Lawyer"
        autocomplete="off"
        maxlength="200"
        class="w-100"
        id="link-username-name"
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
