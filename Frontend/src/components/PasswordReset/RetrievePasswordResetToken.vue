<template>
  <p>Please copy and store this <b>Password-Reset-Token</b> localy on your computer or in a password manager.</p>
  <input type="password" :value="dummyToken" class="forms-inputs mb-4 inp" />
  <button type="button" class="btn btn-primary" @click.prevent="copyPasswordResetToken" data-bs-dismiss="modal">Copy</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Clipboard from 'clipboard'
import { store } from '../../store/store'

export default defineComponent({
    name: "RetrievePasswordResetToken.vue",
    
    data() {
        return{
           dummyToken: '98394rhuwiefeewfweferfrfewcwecwec',
        }
    },

    beforeMount() {
      store.retrievePasswordResetTokenFunction()
    },

    methods: {

        copyPasswordResetToken() { 
          new Clipboard('.btn', {
              text: () => {
              return store.passwordResetToken
               }
            })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             // @ts-ignore: Unreachable code error 
              this.$swal({
              icon: 'success',
              text: 'You copied the link to your clipboard.',
              timer: 1500,
              showConfirmButton: false
              })
        } 
        
      }

});
</script>
<style scoped>
.btn{
  margin-left: 3px;
}
p{
  margin: 0;
  padding: 0;
}
.inp{
  width: 70%;
}
</style>