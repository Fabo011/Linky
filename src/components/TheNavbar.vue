<template>
  <nav class="navbar sticky-top navbar-expand-md bg-dark">
    <div class="d-flex order-lg-2">
      <img
        class="navbar-brand ms-2"
        src="../assets/linky-logo-128px.png"
        id="logo"
        href="/"
        @click.prevent="home"
      />

      <nav v-if="store.authStatus !== 'loggedIn'" class="navbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/signin"
              ><a class="nav-link text-white" href="#">SignIn</a></router-link
            >
          </li>
        </ul>
      </nav>
      <nav v-else-if="store.authStatus == 'loggedIn'" class="navbar">
        <form class="mx-2 my-auto d-inline w-80 my">
          <SearchBar />
          <create-and-save-new-link-vue
            class="position-absolute top-0 end-0"
          ></create-and-save-new-link-vue>
          <TheSettings class="position-absolute top-0 end-0 my" />
        </form>
      </nav>
    </div>
  </nav>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../store/store';
import CreateAndSaveNewLinkVue from './userprofile/TheCreateAndSaveNewLink.vue';
import SearchBar from './TheSearchBar.vue';
import TheSettings from './userprofile/TheSettings.vue';

export default defineComponent({
  name: 'TheNavbar.vue',

  components: {
    CreateAndSaveNewLinkVue,
    SearchBar,
    TheSettings,
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
      store.setUsername(this.refresh);
      store.setToken(this.refresh);
      store.action(this.refresh);
      this.$router.push(`/`);
    },
  },
});
</script>

<style scoped>
.navbar.sticky-top {
  z-index: 5020;
}
#logo {
  width: 50px;
  height: 60px;
  cursor: pointer;
}
.inp-search {
  width: 100%;
}
.my {
  margin-top: 13%;
}
</style>
