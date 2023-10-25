<template>
    <button type="button" class="btn btn-primary" @click="sendMessage">Send</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import eventBus from '../../lib/event-bus';

export default defineComponent({
    name: 'TheChatSendBtn.vue',

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
}
</style>