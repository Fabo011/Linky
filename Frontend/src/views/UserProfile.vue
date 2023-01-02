<template>
    <aside v-for="item in items" :key="item.id" ref="dataComponent">
        <div class="card" id="theCard">
           <h5 class="card-header">
              <img height="18" width="18" :src="baseUrl+item.link" :alt="item.linkname" />
              {{ item.linkname }} <mark class="category">{{ item.category }}</mark>
           </h5> 
         <div class="card-body">
         <h6 class="card-title">{{ item.link }}</h6>
         <p class="card-text">{{ item.linkdescription }}.</p>
         <a :href="item.link" target="_blank" class="btn btn-primary">Open link</a>
      </div>
    </div>
</aside>
</template>

<script>
import { store } from '../store/store';
import { defineComponent } from 'vue';

 export default defineComponent ({
    data() {
        return {
            store,
            baseUrl: 'http://www.google.com/s2/favicons?domain=',
            items: []
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
            const res = await fetch(`http://192.168.1.139:3000/profile/v1/retriveAllLinks/${username}`)
            const data = await res.json()
            this.items = data
        }
    }
}); 
</script>
<style>
#theCard{
    margin: 10px;
}
.category{
  float: right;
  background-color: #f8f9fa;
  font-size: 12px;
  color: red;
}
</style>