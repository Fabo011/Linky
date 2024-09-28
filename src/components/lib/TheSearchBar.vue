<template>
  <input
    data-mdb-input-init
    type="search"
    v-model="searchValue"
    @input="pushSearchValue"
    class="form-control w-100 mt-1"
    placeholder="Search"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { store } from '../../store/store';

export default defineComponent({
  name: 'SearchBar',

  data() {
    return {
      searchValue: '',
    };
  },

  methods: {
    pushSearchValue() {
      const lowercaseSearchValue = this.searchValue.toLowerCase();
      store.searchValue = lowercaseSearchValue;
    },
  },
});
</script>
