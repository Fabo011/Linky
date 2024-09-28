<template>
  <div class="container">
    <div class="forms-inputs mb-4">
      <label for="link-username-email" class="d-block d-flex align-items-center">
        <div v-if="state !== 'create'">
          <mark class="updateText"
            ><b>Update contact phone number</b>
            <i class="currentText" @click.prevent="takeText">{{ state }}</i> with:</mark
          >
        </div>
        <div v-if="state == 'create'">
          <b>Contact Phone Number</b>
        </div>
      </label>
      <input
        v-model="contactPhoneNumber"
        @input="set"
        placeholder="+43 660 989898989"
        autocomplete="off"
        maxlength="35"
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
      contactPhoneNumber: '',
    };
  },

  methods: {
    set() {
      this.contactPhoneNumber = store.transformUmlauts(this.contactPhoneNumber);
      store.contactPhoneNumber = this.contactPhoneNumber;
    },

    takeText() {
      this.contactPhoneNumber = this.state as string;
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
