<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-username-name" class="d-block d-flex align-items-center">
        <div v-if="state !== 'create'">
          <mark class="updateText"
            ><b>Update contact name</b>
            <i class="currentText" @click.prevent="takeText">{{ state }}</i> with:</mark
          >
        </div>
        <div v-if="state == 'create'">
          <b>Contact Name</b>
        </div>
      </label>
      <input
        v-model="contactUsername"
        @input="set"
        placeholder="Lawyer"
        autocomplete="off"
        maxlength="100"
        class="w-100"
        id="link-username-name"
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
      contactUsername: '',
    };
  },

  methods: {
    set() {
      this.contactUsername = store.transformUmlauts(this.contactUsername);
      store.contactName = this.contactUsername;
    },

    takeText() {
      this.contactUsername = this.state as string;
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
