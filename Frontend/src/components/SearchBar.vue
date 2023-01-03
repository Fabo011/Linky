<template>
      <input type="search" v-model="searchValue" @input="pushSearchValue" 
      class="form-control inp-search" placeholder="Search"
      />
</template>
  
<script>
import { defineComponent } from 'vue';
import { store } from '../store/store'
  
export default defineComponent({
  name: 'SearchBar',

  data() {
    return{
      searchValue: ''
      }
  },

  methods: {
    pushSearchValue() {
       store.setSearchValue(this.searchValue)
    }
  }
});
</script>