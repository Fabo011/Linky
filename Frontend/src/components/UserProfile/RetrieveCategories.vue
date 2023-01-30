<template>
 <div class="scrollableCategories">
   <div class="text-secondary mr-2 child" 
          @click.prevent="resetCategories">Categories:</div>
      <mark v-for="item in items" :key="item.category"
        @click.prevent="setCategory(item)"
        class="bg-white text-decoration-underline mr-2 child">
        {{ item }}
      </mark> 
   </div>
</template>
<script>
import { defineComponent } from 'vue'
import globalVaribales from '@/globalVariables'
import { store } from '../../store/store'


export default defineComponent({
  name: 'RetrieveCategories',

  data() {
    return {
       store,
       items: [],
       resetValue: ''
    }
  },

 beforeMount() {
    this.retrieveAllCategories()
 },

  methods: {
    async retrieveAllCategories() {
            const url = globalVaribales[0]
            const username = store.username
            const token = store.token
            try {
             await this.axios.post(`${url}profile/v1/retrieveAllLinks`, 
                { token, username }).then((res) => { 
                  let uniqueCategories = new Set()
                  res.data.forEach(item => {
                  uniqueCategories.add(item.category)
                })
                  this.items = Array.from(uniqueCategories)
               })
           } catch (error) {
              console.error(error)
           }
    },
    
    setCategory(item) {
        store.setSearchValue(item)
    },

    resetCategories() {
        store.setSearchValue(this.resetValue)
    }

   }
});
</script>
<style scoped>
.scrollableCategories {
   max-width: 100%;
   height: 100%;
   display: flex;
   flex-wrap: nowrap;
   overflow-x: scroll;
   overflow-y: hidden;
   margin: 10px;
}
.child {
   cursor: pointer;
   white-space: nowrap;
}
</style>