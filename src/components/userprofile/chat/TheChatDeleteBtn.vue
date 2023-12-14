<template>
  <button type="button" class="chat-delete-btn">
    <TheTrashIcon />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheTrashIcon from '@/assets/svg/TheTrashIcon.vue';

export default defineComponent({
  name: 'TheChatDeleteBtn.vue',
  components: { TheTrashIcon },
});
</script>

<style scoped>
.chat-delete-btn {
  border: none;
  background-color: var(--chat-delete-btn);
  color: var(--primary-white-color);
  padding: 2px;
  font-size: 10px;
  border-radius: 5px;
  float: right;
  cursor: pointer;
  opacity: 0.5;
  width: 22px;
  height: 22px;
  border-radius: 50%;
}
</style>
