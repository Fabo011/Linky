<template>
    <div class="forms-inputs mb-3"> <span><b>Username</b></span> <mark id="mark-counter">{{ username.length }}/12</mark> <br> 
          <input autocomplete="off" type="text" minlength="4" maxlength="12" 
          v-model="username" @input="validate" @click.prevent="resetInput" />
          <p class="text-danger">{{usernameError}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '../../store/store'

export default defineComponent({

  data(){
    return{
        username: '',
        usernameError: '',
    }
  },
  
  methods: {
 
validate(){
 const regEx = new RegExp(/^[a-zA-Z0-9]+$/);
 if(!regEx.test(this.username)) {
     this.usernameError = 'Don`t use special characters. Correct example: John122'
 }else if(this.username.length <=3){
  this.usernameError = 'Username may have between 4 and 12 characters'
 }else{
  this.usernameError = ''
 }
 store.setUsername(this.username)
},

resetInput(){
   this.usernameError = ''
},

  }

});
</script>
<style>
#mark-counter{
  background-color: #ffff;
  font-size: 10px;
}
</style>