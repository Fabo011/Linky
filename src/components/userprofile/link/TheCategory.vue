<template>
  <div class="container">
    <label for="link-category" class="d-flex align-items-center">
      <div v-if="state !== 'create'">
        <mark class="updateText"
          >Update category
          <i class="currentText" @click.prevent="takeText">{{ state }}</i> with:</mark
        >
      </div>
      <div v-if="state == 'create'">
        <b>Category</b>
      </div>
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

  props: {
    state: {
      type: String,
      required: false,
    },
  },
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
        this.categoryError = 'Category may have between 3 and 15 characters.';
      } else {
        this.categoryError = '';
      }

      store.setCategory(this.category);
    },

    resetInput() {
      this.categoryError = '';
    },

    takeText() {
      this.category = this.state as string;
    },
  },
});
</script>
<style scoped>
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
