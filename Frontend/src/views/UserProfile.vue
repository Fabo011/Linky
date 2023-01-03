<template>
  <RetrieveAllLinks />
</template>

<script>
import { defineComponent } from 'vue';
import { store } from '../store/store';
import RetrieveAllLinks from '../components/UserProfile/RetrieveAllLinks.vue';

 export default defineComponent ({
    components: {
      RetrieveAllLinks
    },

    data(){
        return{
            store
        }
    },

    beforeRouteEnter() {
        store.authStatusRefresh()
        if (store.authStatus !== "loggedIn") {
            window.location.href = "/signin"
        }
    },
    
}); 
</script>
