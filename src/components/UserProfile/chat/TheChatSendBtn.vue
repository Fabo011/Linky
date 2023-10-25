<template>
    <button type="button" class="btn btn-primary">Send</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TheChatSendBtn.vue',
});
</script>

<style scoped>
.btn {
    background-color: var(--primary-blue-color);
}
</style>