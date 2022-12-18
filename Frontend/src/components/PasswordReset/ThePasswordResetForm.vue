<template>
    <section>
     <p id="passResetBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">Forget password?</p>
    
     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Reset your password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form class="modal-body">
             <label for="link-name"><b>username</b></label><br>
             <input type="text" v-model="username" placeholder="John122" minlength="3" maxlength="50"/><br>
             <label for="link" id="space-top"><b>Password-Reset-Token</b></label><br>
             <input type="text" class="w-100" v-model="phrase" placeholder="Add token which you generated in your profile settings." minlength="3" maxlength="500"/><br>
          </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="passwordResetBtn" data-bs-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
    </div>
    </section>
</template>
    
<script lang="ts">
    import { defineComponent } from 'vue'
    import { store } from '../../store/store'
    
    export default defineComponent({
    name: "ThePasswordResetForm.vue",
    
     data(){
     return{
       username: '',
       phrase: ''
      }
     },
    
     methods: {
        passwordResetBtn(){
            console.log('Password-Reset');  
        }
     },
    
    
    }); 
    
</script>
<style scoped>
    #passResetBtn{
        cursor: pointer;
        text-decoration: underline;
        color: #007bff;
    }
    #space-top{
        margin-top: 4px;
    }
</style>