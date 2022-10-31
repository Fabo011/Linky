<template>
  <section class="container mt-5">
 <div class="row d-flex justify-content-center">
     <div class="col-md-6">
         <div class="card px-5 py-5" id="form1">
           <h4>Login</h4>

             <form class="form-data">
               <div class="forms-inputs mb-3"> <span>Username</span> <br> 
                 <input autocomplete="off" type="text" v-model="username" @change="validate" @click.prevent="resetInput">
                 <p class="text-danger" v-if="usernameError">Invalid username! Username may have between 4 and 12 characters and
                 don´t use special characters. <br> Correct example: John122</p>
               </div>
                 

                 <div class="forms-inputs mb-4"> <span>Password</span> <br> 
                   <input autocomplete="off" type="password" v-model="password" @change="validatePass" @click.prevent="resetInput">
                   <p class="text-danger" v-if="passwordError">Invalid password! Password may have between 8 and 25 characters.</p>
                 </div>


                 <div class="mb-3"><button class="btn btn-success w-100" @click.prevent="signup">Login</button></div>
                 <p class="text-danger" v-if="signinError">Wrong username or password</p>
             </form>

             <router-link to="/signup"><a class="nav-link" href="#">Don´t have an account? Register here</a></router-link>
         </div>
     </div>
 </div>
</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../store/store';

export default defineComponent({
name: "TheNavbar.vue",


data() {
return{
  username: '',
  password: '',
  store,
  usernameError: false,
  passwordError: false,
  signinError: false,
}
},

methods: {
validate(){
 const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
 if(!regEx.test(this.username) || this.username.length <=3) {
     this.usernameError = true;
 }
},
validatePass(){
 if(this.password.length <=7) {
   this.passwordError = true;
 }
},
resetInput(){
   this.usernameError = false;
   this.passwordError = false;
   this.signinError = false;
},

async signup() {
   const username = this.username;
   const password = this.password;
   
try {
  await this.axios.post('http://localhost:3000/auth/v1/signin', {
     username, password
   }).then((res)=> {
     const token = res.data;
     store.action();
     store.setToken(token);
     this.$router.push(`/profile/${username}`);
   })
} catch (error) {
   this.signinError = true;
}
  
},

}

});
</script>