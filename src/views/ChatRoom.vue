<template>
  <article>
    <section class="position-absolute top-50 start-50 translate-middle w-75 p-3">
      <h1>Chat 💗</h1>
      <p>Chat room</p>
    </section>
    <TheFooter />
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheFooter from '../components/lib/TheFooter.vue';

export default defineComponent({
  name: 'ChatRoom.vue',
  components: { TheFooter },
});
</script>
