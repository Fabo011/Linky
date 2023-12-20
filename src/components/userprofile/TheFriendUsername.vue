<template>
  <div class="forms-inputs mb-3">
    <span><b>Friend Username</b></span>
    <mark id="mark-counter">{{ friendUsername.length }}/12</mark> <br />
    <input
      autocomplete="off"
      type="text"
      minlength="4"
      maxlength="12"
      class="w-100"
      v-model="friendUsername"
      @input="validate"
      @click.prevent="resetInput"
    />
    <p class="text-danger">{{ usernameError }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../store/store';

export default defineComponent({
  data() {
    return {
      friendUsername: '',
      usernameError: '',
    };
  },

  methods: {
    validate() {
      const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
      if (!regEx.test(this.friendUsername)) {
        this.usernameError = 'Don`t use special characters. Correct example: John122';
      } else if (this.friendUsername.length <= 3) {
        this.usernameError = 'Username may have between 4 and 12 characters';
      } else {
        this.usernameError = '';
      }
      store.setFriendUsername(this.friendUsername);
    },

    resetInput() {
      this.usernameError = '';
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
