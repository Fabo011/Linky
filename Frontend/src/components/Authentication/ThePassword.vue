<template>
    <div class="forms-inputs mb-4"> <span>Password</span> <br> 
        <input autocomplete="off" type="password" v-model="password" minlength="8" maxlength="25" 
        @input="validatePass" @click.prevent="resetInput" />
        <p class="text-danger">{{passwordError}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '../../store/store'

export default defineComponent({

  data(){
    return{
        password: '',
        passwordError: '',
    }
  },
  
  methods: {
 
validatePass() {
    if (this.password.length <= 7) {
        this.passwordError = 'Password may have between 8 and 25 characters'
    }else{
      this.passwordError = ''
    }
    store.setPassword(this.password)
},

resetInput(){
   this.passwordError = ''
},

  }

})

</script>