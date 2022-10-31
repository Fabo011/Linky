<template>
  <div class="bg">
     <section class="position-absolute top-50 start-50 translate-middle"> 
      <h1>Linky 💗</h1>
      <p>You will no longer lose or forget your links with Linky. Store your links in the Cloud.</p>
      <!--grab favicon icons, see below and make domain dynamicly-->
      <img height="16" width="16" src='http://www.google.com/s2/favicons?domain=www.threesixty-webdevelopers.com' />
    </section>  
  </div>
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