<template>
  <div class="forms-inputs mb-3">
    <span><b>Email</b></span
    ><br />
    <input
      autocomplete="off"
      type="text"
      minlength="4"
      maxlength="100"
      class="w-100"
      v-model="email"
      @input="validate"
      @click.prevent="resetInput"
    />
    <p class="text-danger">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../store/store';

export default defineComponent({
  data() {
    return {
      email: '',
      error: '',
    };
  },

  methods: {
    validate() {
      const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegEx.test(this.email)) {
        this.error = 'Invalid email format. Please enter a valid email address.';
      } else {
        this.error = '';
      }

      store.email = this.email;
    },

    resetInput() {
      this.error = '';
    },
  },
});
</script>
<style scoped>
#mark-counter {
  background-color: #ffff;
  font-size: 10px;
}
input:focus {
  outline: none;
  box-shadow: none;
}
</style>
