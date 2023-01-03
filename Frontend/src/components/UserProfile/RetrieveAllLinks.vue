<template>

 <section v-for="item in filteredLinks" :key="item.id" ref="dataComponent">
    <div class="card" id="theCard">
       <h5 class="card-header">
          <img height="18" width="18" :src="baseUrl+item.link" :alt="item.linkname" />
          {{ item.linkname }} <mark class="category text-primary">{{ item.category }}</mark>
       </h5> 
     <div class="card-body">
     <h6 class="card-title">{{ item.link }}</h6>
     <p class="card-text">{{ item.linkdescription }}</p>
     <a :href="item.link" target="_blank" class="btn btn-primary btn-sm">Open link</a>
     <button class="btn btn-danger btn-sm btn-space" @click.prevent="deleteLink(item)">Delete</button>
   </div>
  </div>

</section>

</template>

<script>
import { store } from '../../store/store'
import { defineComponent } from 'vue'
import globalVaribales from '../../globalVariables'


 export default defineComponent ({
   name: 'RetrieveAllLinks',

    data() {
        return {
            store,
            baseUrl: 'http://www.google.com/s2/favicons?domain=',
            items: [],
            toast: true
        };
    },

    created() {
     this.retrieveAllLinks()
    },

    computed: {
      filteredLinks: function(){
       return this.items.filter((item)=>{
           return item.linkname.match(store.searchValue) 
                  || item.linkdescription.match(store.searchValue)
                  || item.category.match(store.searchValue)
                  || item.link.match(store.searchValue)
       })
      },
    },

    methods: {  
      async retrieveAllLinks() {
            const url = globalVaribales[0]
            const username = store.username
            const res = await fetch(`${url}profile/v1/retriveAllLinks/${username}`)
            const data = await res.json()
            this.items = data
       },

       async deleteLink(item) {
        this.$swal({
          title: "Warning",
          html: `Do you really want to delete the <b>${item.linkname}</b> link?`,
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          cancelButtonColor: '#0d6efd',
          confirmButtonText: "Delete",
          confirmButtonColor: '#dc3545',
        }).then(async (result)=> {
         if(result.value == true){
          const username = item.username
          const link = item.link
          const token = store.token
          const url = globalVaribales[0]
         try {
                await this.axios.post(`${url}profile/v1/deleteLink`, {
                    username, link, token
                }).then(() => {
                    this.retrieveAllLinks()
                })
            }
            catch (error) {
                console.log(error)
            }
         }else{
          this.$swal.close()
         }// swal if else
          
        })//swal then
       
      },//deleteLink
        
    }//methods
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
}
.btn-space{
    margin-left: 5px;
}
</style>