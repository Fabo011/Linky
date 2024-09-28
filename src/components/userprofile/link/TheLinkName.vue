<template>
  <div class="container">
    <label for="link-name" class="d-flex align-items-center">
      <div v-if="state !== 'create'">
        <mark class="updateText"
          ><b>Update name </b>
          <i class="currentText" @click.prevent="takeText">{{ state }}</i> with:</mark
        >
      </div>
      <div v-if="state == 'create'"><b>Name</b><b class="text-primary">*</b></div>
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

  props: {
    state: {
      type: String,
      required: false,
    },
  },
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

    takeText() {
      this.linkname = this.state as string;
    },
  },
});
</script>
