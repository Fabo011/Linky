<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-password" class="d-block"> Optional: <b>Link Password</b> </label>
      <input
        v-model="linkPassword"
        @input="set"
        placeholder="jsdho@hihiweifw!?"
        autocomplete="off"
        minlength="6"
        maxlength="3000"
        class="w-90"
        id="link-password"
      />
      <button @click.prevent="generatePassword()" class="btn btn-secondary btn-sm ms-1">
        Generate Password
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../../store/store';

export default defineComponent({
  data() {
    return {
      linkPassword: '',
    };
  },

  methods: {
    set() {
      store.setLinkPassword(this.linkPassword);
    },

    async generatePassword() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@?!';
      let generatedPassword = '';
      for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        generatedPassword += characters[randomIndex];
      }
      this.linkPassword = generatedPassword;
      
      this.set();
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
