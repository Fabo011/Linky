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
import eventBus from '@/components/lib/event-bus';

export default defineComponent({
  name: 'TheTextarea.vue',

  created() {
    this.receiveMessageEventBus();
  },

  data() {
    return {
      text: '',
    };
  },

  methods: {
    pushText() {
      store.setChatTextValue(this.text);
    },

    receiveMessageEventBus() {
      eventBus.on('clearChatTextarea', () => {
        this.text = '';
      });
    },
  },
});
</script>

<style scoped>
.area {
  height: 30px;
}
</style>
