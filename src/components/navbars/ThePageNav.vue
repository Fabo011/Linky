<template>
  <nav id="nav" class="navbar sticky-top justify-content-center">
    <div class="d-flex order-lg-2">
      <img
        class="navbar-brand ms-2"
        src="../../assets/linky-logo-128px.png"
        id="logo"
        href="/"
        @click.prevent="home"
      />

      <nav class="navbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item d-flex">
            <router-link to="/signin">
              <a id="signin" class="nav-link border" href="#">
                <span class="text-decoration-underline text-white">Login</span>
              </a>
            </router-link>
            <router-link to="/signup">
              <a class="nav-link text-white" href="#">
                <span class="text-decoration-underline text-white">Register</span>
              </a>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </nav>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../store/store';
import CreateAndSaveNewLinkVue from '../userprofile/link/TheCreateAndSaveNewLink.vue';
import CreateChatRoom from '../userprofile/chat/TheCreateChatRoom.vue';
import TheServiceSelector from '../userprofile/TheServiceSelector.vue';

export default defineComponent({
  name: 'ThePageNav.vue',

  components: {
    CreateAndSaveNewLinkVue,
    CreateChatRoom,
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
      store.setUsername(this.refresh);
      store.setToken(this.refresh);
      store.action(this.refresh);
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

#signin {
  background-color: #5f7fff;
  border-radius: 5%;
  margin-right: 10px;
  padding: 5px;
  color: #fff;
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

.inp-search {
  width: 100%;
}

.my {
  margin-top: 13%;
}
</style>
