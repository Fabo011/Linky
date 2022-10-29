<template>
     <section class="container mt-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-6">
            <div class="card px-5 py-5" id="form1">
              <h4>Register</h4>
                <form class="form-data">
                    <div class="forms-inputs mb-3"> <span>Username</span> <br> <input autocomplete="off" type="text" v-model="username">
                        <!--<div class="invalid-feedback">A valid email is required!</div>-->
                    </div>
                    <div class="forms-inputs mb-4"> <span>Password</span> <br> <input autocomplete="off" type="password" v-model="password">
                        <!--<div class="invalid-feedback">Password must be 8 character!</div>-->
                    </div>
                    <div class="mb-3"> <button type="button" class="btn btn-success w-100" @click.prevent="signup">Register</button> </div>
                </form>
                <router-link to="/signin"><a class="nav-link" href="#">Don´t have an account? Login here</a></router-link>
            </div>
        </div>
    </div>
  </section>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "TheNavbar.vue",
  
data() {
  return{
     username: '',
     password: '',
  }
},

methods: {

   async signup() {
      const username = this.username;
      const password = this.password;

     await this.axios.post('http://localhost:3000/auth/v1/signup', {
        username, password
      }).then((res)=> {
        const token = res.data;
        const authStatus = 'true';
        localStorage.setItem('access_token', token);
        store.dispatch('isAuthenticated', authStatus);
        window.location.href = `/profile/${username}`;
      })
   }

}
   
});
</script>