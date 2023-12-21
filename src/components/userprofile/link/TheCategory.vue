<template>
  <div class="container">
    <label for="link-category" class="d-flex align-items-center">
      <b>Category</b>
      <mark id="mark-counter" class="ms-auto">{{ category.length }}/15</mark>
    </label>
    <input
      type="text"
      v-model="category"
      placeholder="Find or create category..."
      minlength="3"
      maxlength="15"
      class="text-lowercase w-100"
      @input="validate"
      @click.prevent="resetInput"
      @click="showOptions = true"
    />
    <ul v-if="showOptions" class="options border">
      <li v-for="item in store.categories" :key="item" @click.prevent="selectOption(item)">
        {{ item }}
      </li>
    </ul>
    <p class="text-danger">{{ categoryError }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../../store/store';

export default defineComponent({
  name: 'TheCategory.vue',

  data() {
    return {
      category: '',
      categoryError: '',
      store,
      showOptions: false,
    };
  },

  beforeMount() {
    store.retieveAllLinks();
  },

  methods: {
    selectOption(item: string) {
      this.category = item;
      this.showOptions = false;
      store.setCategory(this.category);
    },

    validate() {
      this.showOptions = false;
      if (this.category.length < 3 || this.category.length > 15) {
        this.categoryError =
          'Category may have between 3 and 15 characters.';
      } else {
        this.categoryError = '';
      }
        
      store.setCategory(this.category);
    },

    resetInput() {
      this.categoryError = '';
    },
  },
});
</script>
<style scoped>
#mark-counter {
  background-color: #ffff;
  font-size: 10px;
}
.options {
  cursor: pointer;
  position: absolute;
  list-style: none;
  padding: 2px;
  margin: 0;
  background-color: #fff;
  border-top: 0;
  max-height: 80px;
  overflow-y: scroll;
}
</style>
