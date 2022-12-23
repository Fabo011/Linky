<template>
<section>
   <img src="../../assets/plus.png" id="plus" data-bs-toggle="modal" data-bs-target="#exampleModal" />

 <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add new link 💗</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="modal-body">
         <label for="link-name"><b>Link name or description</b></label><br>
         <input type="text" v-model="linkname" placeholder="linky" minlength="3" maxlength="50"/><br>
         <label for="link" id="space-top"><b>Category</b></label><br>
         <input type="text" class="w-100" v-model="category" placeholder="private" minlength="3" maxlength="500"/><br>
         <TheLink></TheLink>
      </form>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click.prevent="addNewLinkBtn" data-bs-dismiss="modal">Add</button>
      </div>
    </div>
  </div>
</div>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '../../store/store'
import TheLink from '../lib/TheLink.vue';

export default defineComponent({
    name: "CreateAndSaveNewLink.vue",
    components: { TheLink },
    
    data() {
        return {
            linkname: "",
            link: "",
            category: ""
        };
    },
    methods: {
        async addNewLinkBtn() {
            console.log(this.linkname);
            console.log(this.link);
            const username = store.username
            const linkname = this.linkname
            const link = store.link
            const category = this.category
            const token = store.token
            try {
                await this.axios.post("http://localhost:3000/profile/v1/addNewLink", {
                    username,
                    linkname,
                    link,
                    category,
                    token
                }).then((res) => {
                    console.log("Link added successfully");
                });
            }
            catch (error) {
                console.log(error);
            }
        },
    },
}); 

</script>

<style scoped>
#plus{
   width: 25px;
   height: 25px;
   cursor: pointer;
}
#space-top{
   margin-top: 4px;
}
</style>