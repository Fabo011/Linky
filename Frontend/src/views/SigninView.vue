<template>
  <section class="container mt-5">
 <div class="row d-flex justify-content-center">
     <div class="col-md-6">
         <div class="card px-5 py-5" id="form1">
           <h4>Login</h4>

             <form class="form-data">
                 <TheUsername></TheUsername>
                 <ThePassword></ThePassword>
                 <TheAuthButton></TheAuthButton>
             </form>
             <router-link to="/signup"><a class="nav-link" href="#">Don´t have an account? Register here</a></router-link>
         </div>
     </div>
 </div>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheUsername from '@/components/Authentication/TheUsername.vue';
import ThePassword from '@/components/Authentication/ThePassword.vue';
import TheAuthButton from '@/components/Authentication/TheAuthButton.vue';

export default defineComponent({
    name: "SigninView.vue",
    components: { TheUsername, ThePassword, TheAuthButton }
});
</script>