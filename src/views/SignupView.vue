<template>
  <PageNav />
  <section class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card px-5 py-5 shadow p-3 mb-5 bg-body rounded border-0" id="form1">
          <div>
              <h3 class="magic-container">
                <img id="img" src="../../public/img/cat-magic.png" alt="Magic Cat" />
              </h3>
              <b class="magic">Magic Link Register</b>
            </div>
          <hr />
          <form class="form-data">
            <TheUsername />
            <TheEmail />
            <TheRegisterButton />
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
import TheEmail from '@/components/authentication/TheEmail.vue';
import TheRegisterButton from '@/components/authentication/TheRegisterButton.vue';
import PageNav from '@/components/navbars/ThePageNav.vue';
import TheUsername from '@/components/authentication/TheUsername.vue';
import TheFooter from '@/components/lib/TheFooter.vue';

export default defineComponent({
  name: 'SignupView.vue',
  components: { TheEmail, TheRegisterButton, PageNav, TheUsername, TheFooter },
});
</script>

<style scoped>
.nav-link {
  color: var(--primary-blue-color);
}

.magic {
  font-size: xs-small;
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
