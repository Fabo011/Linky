<template>
  <TheProfileNav />
  <div class="linkchain">
    <TheRetrieveCategories />
    <TheLoadingSpinner />
    <TheRetrieveAllLinks />
  </div>
  <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/store/store';
import TheRetrieveAllLinks from '@/components/userprofile/TheRetrieveAllLinks.vue';
import TheRetrieveCategories from '@/components/userprofile/TheRetrieveCategories.vue';
import TheFooter from '@/components/lib/TheFooter.vue';
import TheProfileNav from '@/components/navbars/TheProfileNav.vue';
import TheLoadingSpinner from '@/components/lib/TheLoadingSpinner.vue';

export default defineComponent({
  components: {
    TheRetrieveAllLinks,
    TheRetrieveCategories,
    TheFooter,
    TheProfileNav,
    TheLoadingSpinner,
  },

  data() {
    return {
      store,
    };
  },

  beforeRouteEnter() {
    store.isLoading = true;
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
    width: 65%;
    margin: 0 auto;
    margin-bottom: 20%;
  }
}
</style>
