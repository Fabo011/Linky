<template>
  <div class="mb-3">
    <AuthBtn v-if="nBtn" @click.prevent="push" />
    <LoadingButton v-if="loading" />
  </div>
  <p class="text-danger">{{ errorText }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '../../store/store';
import { supabase } from '../lib/supabaseClient';
import LoadingButton from '../buttons/TheLoadingButton.vue';
import AuthBtn from '../buttons/TheAuthButton.vue';
import { generateKeyPair } from '../crypto/crypto';

export default defineComponent({
  name: 'TheRegisterButton.vue',
  components: { LoadingButton, AuthBtn },

  data() {
    return {
      username: '',
      password: '',
      buttonText: 'Register',
      authStatus: 'loggedIn',
      url: '',
      reset: '',
      store,
      errorText: '',
      nBtn: true,

      // loading
      loading: false,
    };
  },

  methods: {
    async push() {
      this.nBtn = false;
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 1000));

      const email = store.email;
      //const password = store.password;
      
      try {
        generateKeyPair();

        const options = {
          shouldCreateUser: true,
          emailRedirectTo: 'http://localhost:8080/keys',
        }

        const { data, error } = await supabase.auth.signInWithOtp({ email, options });
        if (!error) {
          // Show user what he has to do
          console.log('Check you emails.');
          console.log('data: ' + data);
          
          store.action(this.authStatus);
          //store.setPassword(this.reset);
          this.nBtn = true;
          this.loading = false;
          //this.$router.push(`/keys`);
        } else {
          this.errorText = 'This username already exist.';
          this.nBtn = true;
          this.loading = false;
          console.log(error);
          
        }
      } catch (error) {
        // Add rollbar
        console.trace(error);
        
        this.errorText = 'Internal Error.';
        this.nBtn = true;
        this.loading = false;
      }
    },
  },
});
</script>
