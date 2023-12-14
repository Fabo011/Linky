<template>
  <div class="forms-inputs mb-4">
    <span>Optional: <b>Link Password</b></span> <br />
    <input
      v-model="linkPassword"
      @input="set"
      placeholder="jsdho@hihiweifw!?"
      autocomplete="off"
      minlength="6"
      maxlength="200"
      class="w-100"
    />
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
