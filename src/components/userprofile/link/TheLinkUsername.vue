<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-username-email" class="d-block d-flex align-items-center">
        <div v-if="state !== 'create'">
          <mark class="updateText"
            ><b>Update username or email</b>
            <i class="currentText" @click.prevent="takeText">{{ state }}</i> with:</mark
          >
        </div>
        <div v-if="state == 'create'">
          <b>Your Username or Email on this link</b>
        </div>
      </label>
      <input
        v-model="linkUsername"
        @input="set"
        placeholder="Bob"
        autocomplete="off"
        minlength="6"
        maxlength="200"
        class="w-100"
        id="link-username-email"
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
      linkUsername: '',
    };
  },

  methods: {
    set() {
      this.linkUsername = store.transformUmlauts(this.linkUsername);
      store.setLinkUsername(this.linkUsername);
    },

    takeText() {
      this.linkUsername = this.state as string;
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
