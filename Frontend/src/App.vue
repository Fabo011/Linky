<template>
  <article>
     <TheNavbar></TheNavbar>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
 import TheNavbar from "./components/TheNavbar.vue";

 export default defineComponent({
  name: 'App',
  components: {
   TheNavbar
  },
}); 

</script>


