<template>
  <PageNav />
  <section class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card px-4 py-5 shadow p-3 mb-5 bg-body rounded border-0" id="form1">
          <div>
            <h3 class="magic-container">
              <img id="img" src="../assets/magic-cat.png" alt="Magic Cat" />
            </h3>
            <b class="magic">Login</b>
          </div>
          <hr />
          <form class="form-data">
            <TheUsername />
            <ThePassword />
            <TheSignInButton />
          </form>
        </div>
      </div>
    </div>
  </section>
  <TheFooter />
</template>

<script lang="ts">
import ThePassword from '@/components/authentication/ThePassword.vue';
import TheSignInButton from '@/components/authentication/TheSignInButton.vue';
import TheUsername from '@/components/authentication/TheUsername.vue';
import TheFooter from '@/components/lib/TheFooter.vue';
import PageNav from '@/components/navbars/ThePageNav.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SigninView.vue',
  components: { TheSignInButton, PageNav, TheFooter, TheUsername, ThePassword },
});
</script>

<style scoped>
.nav-link {
  color: var(--primary-blue-color);
}

.magic {
  font-size: large;
  margin-left: 3px;
  margin-top: 30px;
  display: inline-block;
  vertical-align: middle;
}

.magic-container {
  display: inline;
}

#img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
