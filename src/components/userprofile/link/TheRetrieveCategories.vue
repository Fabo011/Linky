<template>
  <div>
    <nav class="navbar navbar-light">
      <button
        class="navbar-toggler hamburger-button"
        type="button"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click.prevent="toggleNav"
        style="z-index: 2"
      >
        <div class="animated-icon" :class="{ open: sidenavWidth !== '0px' }">=</div>
      </button>
    </nav>

    <div class="scrollableCategories">
      <div class="row">
        <div class="col-1 d-flex justify-content-center">
          <div :style="{ width: sidenavWidth }" class="sidenav">
            <div class="text-secondary child" @click.prevent="resetCategories">
              <div class="d-flex justify-content-center align-items-center">
                <TheReloadIcon />
                <span class="cat">Reset Filter</span>
              </div>
            </div>

            <div class="space">Categories</div>
            <div
              v-for="item in store.categories"
              :key="item.category"
              @click.prevent="setCategory(item)"
              class="bg-white text-decoration-none child children position-relative text-left"
            >
              <div class="justify-content-left align-items-left">
                <TheFolderIcon />
                <span class="font">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { store } from '../../../store/store';
import TheFolderIcon from '@/assets/svg/TheFolderIcon.vue';
import TheReloadIcon from '@/assets/svg/TheReloadIcon.vue';

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
      sidenavWidth: '0px',
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

    toggleNav() {
      this.sidenavWidth = this.sidenavWidth === '0px' ? '250px' : '0px';
    },
  },
});
</script>
<style scoped>
.scrollableCategories {
  max-width: 100%;
  display: block;
  flex-wrap: nowrap;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 10px;
  opacity: 0.8;
}
.child {
  cursor: pointer;
  white-space: wrap;
  border-radius: 5%;
  margin-left: 3px;
  max-height: 20%;
}

.children {
  opacity: 0.8;
}
.cat {
  color: var(--primary-background-color);
  font-size: 13px;
}

.font {
  margin-left: 3px;
}

.sidenav {
  height: 100%;
  max-width: 12%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: var(--primary-white-color);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  margin-top: 40px;
}

.sidenav::-webkit-scrollbar {
  display: none;
}

.hamburger-button {
  background-color: var(--primary-blue-color);
  color: var(--primary-white-color);
  border: none;
  margin-left: 10px;
  display: fixed;
}

.space {
  margin-top: 10px;
}
</style>
