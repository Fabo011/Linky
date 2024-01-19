<template>
  <div class="scrollableCategories">
    <div class="text-secondary child" @click.prevent="resetCategories">
      <div class="d-flex justify-content-center align-items-center">
      <TheReloadIcon />
    </div>
      <span class="cat">All</span>
    </div>

    <mark v-for="item in store.categories" :key="item.category" @click.prevent="setCategory(item)"
      class="bg-white text-decoration-none child children position-relative text-center">
      <div class="d-flex justify-content-center align-items-center">
        <TheFolderIcon />
      </div>
      <span class="font">{{ item }}</span>
    </mark>
  </div>
</template>



<script>
import { defineComponent } from 'vue';
import { store } from '../../../store/store';
import TheFolderIcon from '@/assets/svg/TheFolderIcon.vue';
import TheReloadIcon from '@/assets/svg/TheReloadIcon.vue'

export default defineComponent({
  name: 'TheRetrieveCategories',
  components: {
    TheFolderIcon,
    TheReloadIcon,
  },

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
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 10px;
  opacity: 0.6;
}
.child {
  cursor: pointer;
  white-space: nowrap;
  border-radius: 5%;
  margin-left: 3px;
}

.children {
  opacity: 0.8;
}
.cat {
  color: var(--primary-background-color);
  font-size: 13px;
}
.font {
  font-size: 13px;
}
</style>
