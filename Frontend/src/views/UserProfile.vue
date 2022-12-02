<template>
   <pre>authStatus: {{store.authStatus}}</pre>
</template>

<script lang="ts">
import { store } from '../store/store';
import { defineComponent } from 'vue';

 export default defineComponent({
 
   data(){
   return{
     store
    }
   },

  beforeRouteEnter() {
    if(store.authStatus !== 'loggedIn') {
        window.location.href = '/signin'
    }
  }

}); 

</script>