<template>
    <section>
     <p id="passResetBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">Forget password?</p>
    
     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel"><b>Reset your password</b></h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form class="modal-body">
             <TheUsername></TheUsername>
             <label><b>Password-Reset-Token</b></label><br>
             <input type="password" autocomplete="off" class="w-100" v-model="phrase" placeholder="Add token which you generated in your profile settings." minlength="3" maxlength="500"/><br><br>
             <b>New</b><ThePassword></ThePassword>
          </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click.prevent="passwordResetBtn" data-bs-dismiss="modal">Reset</button>
          </div>
        </div>
      </div>
    </div>
    </section>
</template>
    
<script lang="ts">
    import { defineComponent } from 'vue'
import TheUsername from '../Authentication/TheUsername.vue';
import ThePassword from '../Authentication/ThePassword.vue';
    //import { store } from '../../store/store'
    
    export default defineComponent({
    name: "ThePasswordResetForm.vue",
    components: { TheUsername, ThePassword },

    data() {
        return {
            username: "",
            phrase: ""
        };
    },
    methods: {
        passwordResetBtn() {
            console.log("Password-Reset");
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