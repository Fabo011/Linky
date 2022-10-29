<template>
   <div>
      <h1>Authenticated: {{authStatus}}</h1>
   
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

 export default defineComponent({
 

   data(){
   return{
     authStatus: ''
   }
},



  
}); 

</script>