<template>
    <div class="forms-inputs mb-3"> <span>Username</span> <br> 
          <input autocomplete="off" type="text" minlength="4" maxlength="12" 
          v-model="username" @change="validate" @click.prevent="resetInput" />
          <p class="text-danger" v-if="usernameError">Invalid username! Username may have between 4 and 12 characters and
                 don´t use special characters. <br> Correct example: John122
          </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '../../store/store'

export default defineComponent({

  data(){
    return{
        username: '',
        usernameError: false,
    }
  },
  
  methods: {
 
validate(){
 const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
 if(!regEx.test(this.username) || this.username.length <=3) {
     this.usernameError = true
 }
 store.setUsername(this.username)
},

resetInput(){
   this.usernameError = false
},

  }

});
</script>