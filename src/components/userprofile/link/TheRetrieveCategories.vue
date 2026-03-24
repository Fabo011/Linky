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
        <i class="bi" :class="sidenavWidth !== '0px' ? 'bi-x-lg' : 'bi-list'"></i>
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
            <hr />
            <h6>Another Apps</h6>
            <button @click.prevent="navigateToShooters" class="btn btn-primary">🔫 Shooters</button>
            <TheAccountMetric />
            <hr />
            <h6>Export - Backup</h6>
            <TheExport />
            <TheFirefoxExport />
            <hr />
            <h6>Import Data from CSV</h6>
            <TheImport />
            <hr />
            <h6>Documentation</h6>
            <a href="https://linky.fabo011-cloud.de/#/docs" target="_blank">Docs</a>
            <br />
            <a href="https://github.com/Fabo011/Linky/discussions" target="_blank">Discussions</a>
            <hr />
            <h6 class="text-danger">Danger Zone</h6>
            <button @click.prevent="confirmDeleteAccount" class="btn btn-danger btn-sm w-100 mb-2">🗑️ Delete Account</button>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheFolderIcon from '@/assets/svg/TheFolderIcon.vue';
import TheReloadIcon from '@/assets/svg/TheReloadIcon.vue';
import { deleteAccountConfirmToast, errorToast } from '@/components/toasts/toasts';
import TheAccountMetric from '@/components/userprofile/account/TheAccountMetric.vue';
import TheExport from '@/components/userprofile/export-import/TheExport.vue';
import TheFirefoxExport from '@/components/userprofile/export-import/TheFirefoxExport.vue';
import TheImport from '@/components/userprofile/export-import/TheImport.vue';
import { defineComponent } from 'vue';
import { store } from '../../../store/store';

export default defineComponent({
  name: 'TheRetrieveCategories',
  components: {
    TheFolderIcon,
    TheReloadIcon,
    TheAccountMetric,
    TheExport,
    TheImport,
    TheFirefoxExport,
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
    navigateToShooters() {
      const routeData = this.$router.resolve('/shooters');
      window.open(routeData.href, '_blank');
    },
    async confirmDeleteAccount() {
      const result = await deleteAccountConfirmToast();
      if (result.isConfirmed) {
        try {
          await store.deleteAccount();
        } catch {
          errorToast();
        }
      }
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
  border-radius: 8px;
  margin: 2px 0;
  padding: 5px 6px;
  transition: background-color 0.18s;
}

.child:hover {
  background-color: rgba(95, 127, 255, 0.08);
}

.children {
  opacity: 0.85;
}

.cat {
  color: var(--primary-background-color);
  font-size: 13px;
  font-weight: 500;
  padding-top: 10px;
}

.font {
  margin-left: 4px;
  font-size: 13px;
}

.sidenav {
  height: 100%;
  max-width: 15%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--primary-white-color);
  overflow-x: hidden;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding-top: 60px;
  margin-top: 40px;
  z-index: 1000;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1);
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
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 2px 10px rgba(95, 127, 255, 0.35);
  transition: background-color 0.2s, transform 0.1s;
}

.hamburger-button:hover {
  background-color: #4a6ef5;
  transform: scale(1.05);
}

.space {
  margin-top: 10px;
  padding-left: 10px;
}

.space h6 {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #999;
  margin: 14px 0 6px;
}
</style>
