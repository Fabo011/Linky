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
      <div :style="{ width: sidenavWidth }" class="sidenav">
        <div class="text-secondary child" @click.prevent="resetCategories">
          <div class="d-flex justify-content-center align-items-center">
            <TheReloadIcon />
            <span class="cat">Reset Filter</span>
          </div>
        </div>

        <div class="scroll">
          <div class="space">
            <h6>Categories</h6>
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
            <TheAccountMetric />
            <hr />
            <h6>Backup</h6>
            <TheExport />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheFolderIcon from '@/assets/svg/TheFolderIcon.vue';
import TheReloadIcon from '@/assets/svg/TheReloadIcon.vue';
import TheAccountMetric from '@/components/userprofile/account/TheAccountMetric.vue';
import TheExport from '@/components/userprofile/export-import/TheExport.vue';
import { defineComponent } from 'vue';
import { store } from '../../../store/store';

export default defineComponent({
  name: 'TheRetrieveCategories',
  components: {
    TheFolderIcon,
    TheReloadIcon,
    TheAccountMetric,
    TheExport,
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
      store.searchValue = item;
    },

    resetCategories() {
      store.searchValue = this.resetValue;
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
  margin: 10px;
  position: relative;
  z-index: 1;
  max-height: 30px;
  margin-left: 10px;
}

.scroll {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 80%;
}
.child {
  cursor: pointer;
  white-space: wrap;
  border-radius: 5%;
  margin-left: 3px;
}

.children {
  opacity: 0.8;
}
.cat {
  color: var(--primary-background-color);
  font-size: 13px;
  padding-top: 10px;
}

.font {
  margin-left: 3px;
}

.sidenav {
  height: 100%;
  max-width: 15%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--primary-white-color);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  margin-top: 40px;
  z-index: 1000;
}

@media (max-width: 768px) {
  .sidenav {
    max-width: 50%;
  }
  .hamburger-button {
    margin-bottom: 250px;
  }
}

.sidenav::-webkit-scrollbar {
  display: none;
}

.hamburger-button {
  background-color: var(--primary-blue-color);
  color: var(--primary-white-color);
  border: none;
  margin-left: 10px;
  position: fixed;
  top: 70px;
  left: 10px;
}

.space {
  margin-top: 10px;
  padding-left: 10px;
}
</style>
