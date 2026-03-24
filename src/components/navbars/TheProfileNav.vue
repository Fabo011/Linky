<template>
  <nav id="nav" class="navbar sticky-top justify-content-center">
    <div class="d-flex">
      <img
        class="navbar-brand ms-1"
        src="../../assets/linky-logo-128px.png"
        id="logo"
        href="/"
        @click.prevent="home"
      />

      <nav>
        <div class="d-flex align-items-center justify-content-center">
          <SearchBar />
          <TheServiceSelector />
        </div>
      </nav>
    </div>
  </nav>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../store/store';
import SearchBar from '../lib/TheSearchBar.vue';
import CreateAndSaveNewLinkVue from '../userprofile/link/TheCreateAndSaveNewLink.vue';
import TheServiceSelector from '../userprofile/TheServiceSelector.vue';

export default defineComponent({
  name: 'TheNavbar.vue',

  components: {
    CreateAndSaveNewLinkVue,
    SearchBar,
    TheServiceSelector,
  },

  data() {
    return {
      store,
      refresh: '',
      searchValue: '',
    };
  },

  methods: {
    home() {
      store.logout();
      this.$router.push(`/`);
    },
  },
});
</script>

<style scoped>
#nav {
  background-color: rgba(24, 24, 36, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  height: 60px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.navbar.sticky-top {
  z-index: 1040;
}

#logo {
  margin: 0;
  margin-right: 5px;
  width: 40px;
  height: 50px;
  cursor: pointer;
  transition: opacity 0.2s;
}

#logo:hover {
  opacity: 0.82;
}
</style>
