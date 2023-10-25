<template>
  <textarea
    type="search"
    v-model="text"
    @input="pushText"
    class="form-control inp-search w-100 area"
    placeholder="message"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store/store';

export default defineComponent({
  name: 'TheTextarea.vue',

  data() {
    return {
      text: '',
    };
  },

  methods: {
    pushText() {
      store.setChatTextValue(this.text);
    },
  },
});
</script>

<style scoped>
.area {
  height: 30px;
}
</style>
