<template>
    <TheArchiveNav />
    <article>
        <section class="position-absolute top-50 start-50 translate-middle w-75 p-3">
            <h1>File Archive</h1>
            <p>
                Files
            </p>
        </section>
        <TheFooter />
    </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheFooter from '../components/lib/TheFooter.vue';
import TheArchiveNav from '@/components/navbars/TheArchiveNav.vue';

export default defineComponent({
    name: 'FileArchive',
    components: { TheArchiveNav, TheFooter },
});
</script>