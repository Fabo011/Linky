<template>
  <button type="button" class="btn btn-primary" @click.prevent="sendMessage">
    <ChatBtnIcon />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import eventBus from '../../lib/event-bus';
import ChatBtnIcon from '@/assets/svg/TheChatBtnIcon.vue';

export default defineComponent({
  name: 'TheChatSendBtn.vue',
  components: { ChatBtnIcon },

  methods: {
    sendMessage() {
      eventBus.emit('sendMessage');
    },
  },
});
</script>

<style scoped>
.btn {
  background-color: var(--primary-blue-color);
  margin: 3px;
}
</style>
