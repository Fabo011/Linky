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
import { signeduptoast } from '@/components/toasts/toasts';
import { saveNewUser } from '@/components/authentication/saveNewUser';

export default defineComponent({
  name: 'TheRegisterButton.vue',
  components: { LoadingButton, AuthBtn },

  data() {
    return {
      buttonText: 'Register',
      authStatus: 'loggedIn',
      url: '',
      reset: '',
      store,
      errorText: '',
      nBtn: true,
      loading: false,
    };
  },

  methods: {
    async push() {
      this.nBtn = false;
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const email = store.email;

      try {
        const publicKey = generateKeyPair();

        const url = 'http://localhost:8080/keys';
        const options = {
          shouldCreateUser: true,
          emailRedirectTo: url,
        };

        const { error } = await supabase.auth.signInWithOtp({ email, options });
        if (!error) {
          await saveNewUser(email, publicKey);
          store.action(this.authStatus);
          this.nBtn = true;
          this.loading = false;
          this.store.email = this.reset;
          signeduptoast();
        } else {
          this.errorText = 'This email already exist.';
          this.nBtn = true;
          this.loading = false;
          console.log(error);
        }
      } catch (error) {
        // Add rollbar
        console.trace(error);
        this.errorText = 'This email already exist.';
        this.nBtn = true;
        this.loading = false;
      }
    },
  },
});
</script>
