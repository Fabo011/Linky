<template>
    <div v-for="item in items" :key="item.id">
        <p >{{ item.link }}</p>
    </div>
</template>

<script lang="ts">
import { store } from '../store/store';
import { defineComponent } from 'vue';
interface item {
    id: number
    username: string
    linkname: string
    link: string
    inkdescription: string
    category: string
  }

 export default defineComponent({
    data() {
        return {
            store,
            items: [] as item
        };
    },
    beforeRouteEnter() {
        store.authStatusRefresh()
        if (store.authStatus !== "loggedIn") {
            window.location.href = "/signin";
        }
    },

    beforeMount() {
      this.retrieveAllLinks()
    },

    methods: {  
       async retrieveAllLinks() {

            const username = store.username
            this.items = await this.axios.get(`http://localhost:3000/profile/v1/retriveAllLinks/${username}`)
        }
    }
}); 

</script>