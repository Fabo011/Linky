<template>
  <PageNav />
  <section class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card px-4 py-5 shadow p-3 mb-5 bg-body rounded border-0" id="form1">
          <h3>
            <b>Register </b>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </h3>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheUsername from '@/components/authentication/TheUsername.vue';
import ThePassword from '@/components/authentication/ThePassword.vue';
import TheRegisterButton from '@/components/authentication/TheRegisterButton.vue';
import PageNav from '@/components/navbars/ThePageNav.vue';

export default defineComponent({
  name: 'SignupView.vue',
  components: { TheUsername, ThePassword, TheRegisterButton, PageNav },
});
</script>
