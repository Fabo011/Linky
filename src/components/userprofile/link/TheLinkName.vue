<template>
  <div class="container">
    <label for="link-name" class="d-flex align-items-center">
      <b>Name</b>
    </label>
    <input
      type="text"
      v-model="linkname"
      placeholder="linky"
      minlength="3"
      maxlength="30"
      class="w-100"
      @input="validate"
      @click.prevent="resetInput"
    />
    <p class="text-danger">{{ linknameError }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../../store/store';

export default defineComponent({
  name: 'LinkName.vue',

  data() {
    return {
      linkname: '',
      linknameError: '',
    };
  },

  methods: {
    validate() {
      if (this.linkname.length < 3 || this.linkname.length > 20) {
        this.linknameError = 'Linkname may have between 3 and 20 characters.';
      } else {
        this.linknameError = '';
      }
      store.setLinkname(this.linkname);
    },

    resetInput() {
      this.linknameError = '';
    },
  },
});
</script>
