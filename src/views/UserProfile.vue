<template>
  <RetrieveCategories />
  <RetrieveAllLinks />
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
