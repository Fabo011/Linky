<template>
  <article>
     <section class="position-absolute top-50 start-50 translate-middle w-75 p-3"> 
      <h1>Linky 💗</h1>
      <p>You will no longer forget or click on dangerous links with Linky. Store your links <b>secure</b> and <b>anonymous</b> in the Cloud.</p>
      <!--grab favicon icons, see below and make domain dynamicly-->
      <img height="16" width="16" src='http://www.google.com/s2/favicons?domain=www.threesixty-webdevelopers.com' />
    </section> 
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'HomeView',
  components: {
  },
});
</script>

<style>
.bg{
  background-image: url("../assets/bg.jpg");
  background-size: cover;
}
</style>