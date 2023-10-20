<template>
  <div class="scrollableCategories">
    <div class="text-secondary child" @click.prevent="resetCategories">
      <span class="cat">Categories</span>
    </div>
    <mark v-for="item in store.categories" :key="item.category" @click.prevent="setCategory(item)"
      class="bg-white text-decoration-none child children"
      >
      {{ item }}
    </mark>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { store } from '../../store/store';

export default defineComponent({
  name: 'TheRetrieveCategories',

  data() {
    return {
      store,
      resetValue: '',
    };
  },

  beforeMount() {
    store.retieveAllLinks();
  },

  methods: {
    setCategory(item) {
      store.setSearchValue(item);
    },

    resetCategories() {
      store.setSearchValue(this.resetValue);
    },
  },
});
</script>
<style scoped>
.scrollableCategories {
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 10px;
  opacity: 0.5;
}
.child {
  cursor: pointer;
  white-space: nowrap;
  border-radius: 5%;
}

.children {
  opacity: 0.8;
}
.cat {
  color: var(--primary-background-color);
}
</style>
