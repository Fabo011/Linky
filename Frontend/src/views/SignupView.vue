<template>
     <section class="container mt-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-6">
            <div class="card px-4 py-5 shadow p-3 mb-5 bg-body rounded border-0" id="form1">
              <h3><b>Register 💗</b></h3>
              <hr />
                <form class="form-data">
                    <TheUsername></TheUsername>
                    <ThePassword></ThePassword>
                    <TheRegisterButton></TheRegisterButton>
                </form>
                <router-link to="/signin"><a class="nav-link" href="#">Already have an account? Login here</a></router-link>
            </div>
        </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheUsername from '@/components/Authentication/TheUsername.vue';
import ThePassword from '@/components/Authentication/ThePassword.vue';
import TheRegisterButton from '@/components/Authentication/TheRegisterButton.vue';

export default defineComponent({
    name: "SignupView.vue",
    components: { TheUsername, ThePassword, TheRegisterButton }
});
</script>