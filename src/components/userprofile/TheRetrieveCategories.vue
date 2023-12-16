<template>
  <div class="scrollableCategories">
    <div class="text-secondary child" @click.prevent="resetCategories">
      <div class="folder-container">
        <i class="bi bi-arrow-counterclockwise cat" style="font-size: 1.5rem"></i>
      </div>
    </div>
    <mark
      v-for="item in store.categories"
      :key="item.category"
      @click.prevent="setCategory(item)"
      class="bg-white text-decoration-none child children"
    >
      <div class="folder-container">
        <i class="bi bi-folder" style="font-size: 1.5rem"></i>
        <span class="folder-text" style="font-size: 0.8rem">{{ item }}</span>
      </div>
    </mark>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { store } from '@/store/store';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default defineComponent({
  name: 'TheRetrieveCategories',

  data() {
    return {
      store,
      resetValue: '',
    };
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

.folder-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.children {
  opacity: 0.8;
  margin-right: 3px;
}

.cat {
  color: var(--primary-background-color);
}

.folder-text {
  margin-top: -8px;
  font-size: 0.8rem;
}
</style>
