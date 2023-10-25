<template>
    <input type="search" v-model="text" @input="pushText" class="form-control inp-search w-100"
        placeholder="text" />
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
        }
    },
});
</script>