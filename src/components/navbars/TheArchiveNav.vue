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
          <!--Eventually replace with atchive searchbar--><SearchBar />
          <TheUploadSelector />
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
import CreateChatRoom from '../userprofile/chat/TheCreateChatRoom.vue';
import TheUploadSelector from '../userprofile/filearchive/TheUploadSelector.vue';

export default defineComponent({
  name: 'TheArchiveNav.vue',

  components: {
    SearchBar,
    TheUploadSelector,
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
      this.$router.push(`profile`);
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
