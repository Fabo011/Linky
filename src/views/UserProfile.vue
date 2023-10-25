<template>
  <ProfileNav />
  <div class="linkchain">
    <RetrieveCategories />
    <RetrieveAllLinks />
  </div>
  <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../store/store';
import RetrieveAllLinks from '@/components/userprofile/link/TheRetrieveAllLinks.vue';
import RetrieveCategories from '@/components/userprofile/link/TheRetrieveCategories.vue';
import TheFooter from '@/components/lib/TheFooter.vue';
import ProfileNav from '@/components/navbars/TheProfileNav.vue';

export default defineComponent({
  components: {
    RetrieveAllLinks,
    RetrieveCategories,
    TheFooter,
    ProfileNav,
  },

  data() {
    return {
      store,
    };
  },

  beforeRouteEnter() {
    store.authStatusRefresh();
    if (store.authStatus !== 'loggedIn') {
      window.location.href = '/signin';
    }
  },
});
</script>
<style scoped>
.linkchain {
  margin-bottom: 25%;
}

@media (max-width: 767px) {
  .linkchain {
    width: 95%;
    margin: 0 auto;
    margin-bottom: 25%;
  }
}

@media (min-width: 768px) {
  .linkchain {
    width: 75%;
    margin: 0 auto;
    margin-bottom: 20%;
  }
}
</style>
