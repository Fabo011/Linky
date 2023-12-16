<template>
  <nav id="nav" class="navbar sticky-top justify-content-center">
    <div class="d-flex">
      <img
        class="navbar-brand ms-1"
        src="../../assets/linky-logo-128px.png"
        id="logo"
        href="#"
        @click.prevent="home"
      />

      <nav>
        <div class="d-flex align-items-center justify-content-center">
          <TheChatTextarea />
          <TheChatSendBtn />
        </div>
      </nav>
    </div>
  </nav>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store/store';
import TheChatSendBtn from '@/components/userprofile/chat/TheChatSendBtn.vue';
import TheChatTextarea from '@/components/userprofile/chat/TheChatTextarea.vue';

export default defineComponent({
  name: 'TheChatNavbar.vue',

  components: {
    TheChatTextarea,
    TheChatSendBtn,
  },

  beforeRouteEnter() {
    store.authStatusRefresh();
  },

  data() {
    return {
      store,
      username: store.username,
      refresh: '',
      searchValue: '',
    };
  },

  methods: {
    home() {
      this.$router.push(`/profile`);
    },
  },
});
</script>

<style scoped>
#nav {
  background-color: #333;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
</style>
