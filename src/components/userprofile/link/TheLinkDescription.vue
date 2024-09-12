<template>
  <div class="container">
    <label for="link-description" class="d-flex align-items-center">
      <div v-if="state !== 'create'">
        <mark class="updateText"
          >Update tags <i class="currentText" @click.prevent="takeText">{{ state }}</i> with:</mark
        >
      </div>
      <div v-if="state == 'create'">
        <b>Tags</b>
      </div>
    </label>
    <input
      type="text"
      v-model="linkdescription"
      placeholder="use tags"
      minlength="3"
      maxlength="60"
      class="w-100"
      @input="validate"
      @click.prevent="resetInput"
    />
    <p class="text-danger">{{ linkdescriptionError }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../../store/store';

export default defineComponent({
  name: 'LinkDescription.vue',

  props: {
    state: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      linkdescription: '',
      linkdescriptionError: '',
    };
  },

  methods: {
    validate() {
      if (this.linkdescription.length < 3 || this.linkdescription.length > 60) {
        this.linkdescriptionError = 'Link-Description may have between 3 and 60 characters.';
      } else {
        this.linkdescriptionError = '';
      }
      store.setLinkdescription(this.linkdescription);
    },

    resetInput() {
      this.linkdescriptionError = '';
    },

    takeText() {
      this.linkdescription = this.state as string;
    },
  },
});
</script>
