<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-contact-email" class="d-block d-flex align-items-center">
        <div v-if="state !== 'create'">
        <mark class="updateText">Update contact email <i class="currentText" @click.prevent="takeText">{{ state }}</i> with:</mark>
      </div>
      <div v-if="state == 'create'">
        <b>Contact Email</b>
      </div>
      </label>
      <input
        v-model="contactEmail"
        @input="set"
        placeholder="example@skiff.com"
        autocomplete="off"
        maxlength="50"
        class="w-100"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { store } from '@/store/store';
import { defineComponent } from 'vue';

export default defineComponent({

  props: {
    state: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      contactEmail: '',
    };
  },

  methods: {
    set() {
      store.contactEmail = this.contactEmail;
    },

    takeText() {
      this.contactEmail = this.state as string
    }
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
