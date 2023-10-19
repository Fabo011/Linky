<template>
  <article>
     <section class="position-absolute top-50 start-50 translate-middle w-75 p-3"> 
      <h1>Linky 💗</h1>
      <p>You will no longer forget any links with Linky. Store your links <b>securely</b> and <b>anonymously</b> in the Cloud.</p>
    </section> 
    <TheFooter />
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheFooter from '../components/lib/TheFooter.vue'

export default defineComponent({
  name: 'HomeView',
  components: { TheFooter }
});
</script>

<style>
.bg{
  background-image: url("../assets/bg.jpg");
  background-size: cover;
}
</style>