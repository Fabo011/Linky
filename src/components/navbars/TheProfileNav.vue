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
import CreateAndSaveNewLinkVue from '../userprofile/link/TheCreateAndSaveNewLink.vue';
import SearchBar from '../lib/TheSearchBar.vue';
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
  background-color: #333;
  height: 60px;
}

.navbar.sticky-top {
  z-index: 5020;
}

#logo {
  margin: 0;
  margin-right: 5px;
  width: 40px;
  height: 50px;
  cursor: pointer;
}
</style>
