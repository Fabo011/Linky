<template>
  <ProfileNav />
  <RetrieveCategories />
  <div class="linkchain">
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
import 'bootstrap-icons/font/bootstrap-icons.css';

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

  async beforeRouteEnter() {
    await store.checkUser();
  },
});
</script>
<style scoped>
.linkchain {
  margin-bottom: 35%;
}

@media (max-width: 767px) {
  .linkchain {
    width: 95%;
    margin: 0 auto;
    margin-bottom: 25%;
    margin-top: 10%;
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
