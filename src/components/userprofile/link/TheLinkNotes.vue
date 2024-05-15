<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-contact-email" class="d-block">
        <b>Notes</b>
      </label>
      <textarea
        v-model="linkNotes"
        @input="set"
        placeholder="This is where I purchase my classes"
        autocomplete="off"
        maxlength="4000"
        class="w-100"
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
      linkNotes: '',
    };
  },

  methods: {
    set() {
      store.linkNotes = this.linkNotes;
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
