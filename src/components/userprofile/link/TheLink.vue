<template>
  <div class="container">
    <div class="forms-inputs mb-3" id="space-top">
      <label class="d-flex align-items-center">
        <b>Link</b>
      </label>
      <input
        type="text"
        class="w-100"
        placeholder="https://www.linkycloud.com"
        minlength="5"
        maxlength="800"
        v-model="link"
        @input="validate"
      />
      <p class="text-danger">{{ linkError }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../../store/store';

export default defineComponent({
  name: 'TheLink.vue',

  data() {
    return {
      link: '',
      linkError: '',
    };
  },

  methods: {
    validate() {
      const regEx = new RegExp(
        /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
      );
      if (!regEx.test(this.link) || this.link.length <= 4 || this.link.length >= 801) {
        this.linkError = 'Please enter valid link';
      } else {
        this.linkError = '';
      }
      store.setLink(this.link);
    },
  },
});
</script>
<style scoped>
#space-top {
  margin-top: 4px;
}
#mark-counter {
  background-color: #ffff;
  font-size: 10px;
}
</style>
