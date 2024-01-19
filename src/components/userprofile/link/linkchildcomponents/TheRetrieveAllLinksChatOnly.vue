<template>
  <button v-if="item.category === 'chat'" class="btn share" @click.prevent="setChatKey()">
    <a class="btn btn-sm openlink">
      <TheChatBtnIcon /><br />
      <span class="clipboard">Link</span>
    </a>
  </button>
  <button v-if="item.category == 'chat'" class="btn share">
    <TheShareChat :item="item" />
    <span class="clipboard">Share Chat</span>
  </button>
</template>
<script lang="ts">
import { store } from '../../../../store/store';
import { defineComponent } from 'vue';
import TheChatBtnIcon from '@/assets/svg/TheChatBtnIcon.vue';
import TheShareChat from '../../chat/TheShareChat.vue';

export default defineComponent({
  name: 'TheRetrieveAllLinksChatOnly',
  components: {
    TheChatBtnIcon,
    TheShareChat,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      store,
    };
  },

  methods: {
    setChatKey() {
      const item = this.item as any;

      const chatKey = item.chatKey;
      const iv = item.iv;
      sessionStorage.setItem('chatKey', chatKey);
      sessionStorage.setItem('iv', iv);
      this.$router.push(`/chat/${item.chatRoom}`);
    },
  },
});
</script>
<style scoped>
.openlink {
  background-color: var(--primary-blue-color);
}
.btn {
  color: var(--primary-background-color);
  color: var(--primary-white-color);
  height: 50px;
}
.share {
  color: var(--primary-background-color);
}
.clipboard {
  margin: 0;
  font-size: 8px;
}
</style>
