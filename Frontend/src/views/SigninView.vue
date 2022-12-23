<template>
  <section class="container mt-5">
 <div class="row d-flex justify-content-center">
     <div class="col-md-6">
         <div class="card px-4 py-5 shadow p-3 mb-5 bg-body rounded border-0" id="form1">
           <h3><b>Login 💗</b></h3>
           <hr />
             <form class="form-data">
                 <TheUsername></TheUsername>
                 <ThePassword></ThePassword>
                 <TheLoginButton></TheLoginButton>
             </form>
             <router-link to="/signup"><a class="nav-link" href="#">Don´t have an account? Register here</a></router-link>
             <ThePasswordResetForm></ThePasswordResetForm>
         </div>
     </div>
 </div>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheUsername from '@/components/Authentication/TheUsername.vue'
import ThePassword from '@/components/Authentication/ThePassword.vue'
import TheLoginButton from '@/components/Authentication/TheLoginButton.vue'
import ThePasswordResetForm from '@/components/PasswordReset/ThePasswordResetForm.vue';

export default defineComponent({
    name: "SigninView.vue",
    components: { TheUsername, ThePassword, TheLoginButton, ThePasswordResetForm }
});
</script>