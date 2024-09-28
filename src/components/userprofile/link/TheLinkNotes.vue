<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-contact-email" class="d-block d-flex align-items-center">
        <div v-if="state !== 'create'">
          <mark class="updateText"
            ><b>Update notes </b>
            <i class="currentText" @click.prevent="takeText">{{ state }}</i> with:</mark
          >
        </div>
        <div v-if="state == 'create'">
          <b>Notes</b>
        </div>
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
      linkNotes: '',
    };
  },

  methods: {
    set() {
      store.linkNotes = this.linkNotes;
    },

    takeText() {
      this.linkNotes = this.state as string;
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
