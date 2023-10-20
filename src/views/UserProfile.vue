<template>
  <div class="linkchain">
    <RetrieveCategories />
    <RetrieveAllLinks />
  </div>
  <TheFooter />
</template>

<script>
import { defineComponent } from 'vue';
import { store } from '../store/store';
import RetrieveAllLinks from '@/components/userprofile/TheRetrieveAllLinks.vue';
import RetrieveCategories from '@/components/userprofile/TheRetrieveCategories.vue';
import TheFooter from '@/components/lib/TheFooter.vue';

export default defineComponent({
  components: {
    RetrieveAllLinks,
    RetrieveCategories,
    TheFooter,
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
