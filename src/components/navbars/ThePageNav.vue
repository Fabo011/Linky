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
            <router-link to="/docs">
              <a id="docs" class="nav-link text-white" href="#" target="_blank">
                <span class="text-decoration-underline text-white">Docs</span>
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
import TheServiceSelector from '../userprofile/TheServiceSelector.vue';

export default defineComponent({
  name: 'ThePageNav.vue',

  components: {
    CreateAndSaveNewLinkVue,
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
      this.$router.push(`/`);
    },
  },
});
</script>

<style scoped>
#nav {
  background-color: rgba(40, 40, 40, 0.97);
  height: 60px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.22);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.navbar.sticky-top {
  z-index: 1040;
}

#signin {
  background-color: #5f7fff;
  border-radius: 8px;
  margin-right: 10px;
  padding: 5px 14px;
  color: #fff;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
}

#signin:hover {
  background-color: #4a6ef5;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(95, 127, 255, 0.4);
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
.space {
  margin-left: 5px;
}
</style>
