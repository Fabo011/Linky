<template>
 <span class="scrollableCategories">
   <span class="text-secondary child" 
          @click.prevent="resetCategories">Categories:</span>
      <mark v-for="item in items" :key="item.category"
        @click.prevent="setCategory(item)"
        class="bg-white text-decoration-underline child">
        {{ item }}
      </mark> 
 </span>
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
            const res = await fetch(`${url}profile/v1/retriveAllLinks/${username}`)
            const data = await res.json()

            let uniqueCategories = new Set()
            data.forEach(item => {
             uniqueCategories.add(item.category)
            })
           this.items = Array.from(uniqueCategories)
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
   max-height: 30px;
   display: flex;
   flex-wrap: nowrap;
   overflow-x: scroll;
   margin: 10px;
}
.child {
   cursor: pointer;
}
</style>