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
            <b class="magic">Register</b>
          </div>
          <hr />
          <form class="form-data">
            <TheUsername></TheUsername>
            <ThePassword></ThePassword>
            <TheRegisterButton></TheRegisterButton>
          </form>
          <router-link to="/signin"
            ><a class="nav-link" href="#">Already have an account? Login here</a></router-link
          >
        </div>
      </div>
    </div>
  </section>
  <TheFooter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheUsername from '@/components/authentication/TheUsername.vue';
import ThePassword from '@/components/authentication/ThePassword.vue';
import TheRegisterButton from '@/components/authentication/TheRegisterButton.vue';
import PageNav from '@/components/navbars/ThePageNav.vue';
import TheFooter from '@/components/lib/TheFooter.vue';

export default defineComponent({
  name: 'SignupView.vue',
  components: { TheUsername, ThePassword, TheRegisterButton, PageNav, TheFooter },
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
