<template>
 <div class="scrollableCategories">
   <div class="text-secondary mr-2 child" 
          @click.prevent="resetCategories">Categories:</div>
      <mark v-for="item in store.categories" :key="item.category"
        @click.prevent="setCategory(item)"
        class="bg-white text-decoration-underline mr-2 child">
        {{ item }}
      </mark> 
   </div>
</template>
<script>
import { defineComponent } from 'vue'
import { store } from '../../store/store'


export default defineComponent({
  name: 'RetrieveCategories',

  data() {
    return {
       store,
       resetValue: ''
    }
  },

 beforeMount() {
    store.retieveAllLinks()
 },

  methods: {
    
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