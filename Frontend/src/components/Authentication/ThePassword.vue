<template>
    <div class="forms-inputs mb-4"> <span>Password</span> <br> 
        <input autocomplete="off" type="password" v-model="password" minlength="8" maxlength="25" 
        @change="validatePass" @click.prevent="resetInput" />
        <p class="text-danger" v-if="passwordError">Invalid password! Password may have between 8 and 25 characters.</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '../../store/store'

export default defineComponent({

  data(){
    return{
        password: '',
        passwordError: false,
    }
  },
  
  methods: {
 
validatePass() {
    if (this.password.length <= 7) {
        this.passwordError = true;
    }
    store.setPassword(this.password)
},

resetInput(){
   this.passwordError = false
},

  }

})

</script>