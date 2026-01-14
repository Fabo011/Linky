<template>
  <div>
    <vue-turnstile v-model="token" site-key="1x00000000000000000000AA" />
    <div class="mb-3">
      <AuthBtn v-if="nBtn" @click.prevent="push" />
      <LoadingButton v-if="loading" />
    </div>
    <p class="text-danger">{{ errorText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//@ ts-ignore next-line
import VueTurnstile from 'vue-turnstile';
import { store } from '../../store/store';
import AuthBtn from '../buttons/TheAuthButton.vue';
import LoadingButton from '../buttons/TheLoadingButton.vue';
import { generateRandomKey } from '../crypto/crypto';
import { supabase } from '../lib/supabaseClient';

export default defineComponent({
  name: 'TheLoginButton',
  components: { LoadingButton, AuthBtn, VueTurnstile },

  data() {
    return {
      buttonText: 'Login',
      store,
      errorText: '',
      nBtn: true,
      loading: false,
      token: '',
    };
  },

  methods: {
    async push() {
      if (!this.token) {
        this.errorText = 'Please complete the CAPTCHA.';
        return;
      }

      this.nBtn = false;
      this.loading = true;
      const email = store.email;
      const password = store.password;

      const options = {
        data: {
          tariff: 'free',
        },
        captchaToken: this.token, // Pass Turnstile token to Supabase
      };

      try {
        // Try to sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!signInError) {
          this.clearFunction();
          store.state = 'authenticatedUser';
          this.$router.push(`/key`);
        } else {
          // If sign-in fails, try to sign up
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options,
          });

          if (signUpError) {
            this.errorText =
              'If you tried to login: Check username or password. If you tried to sign up: Username already in use. Try another one.';
            this.clearFunction();
          } else {
            this.clearFunction();
            const { key, iv } = generateRandomKey();
            const digitalKey = `${key}.${iv}`;
            sessionStorage.setItem('key', digitalKey);
            store.state = 'newuser';
            this.$router.push(`/key`);
          }
        }
      } catch (error) {
        this.clearFunction();
        this.errorText = 'Internal Error. Try again or contact support.';
      }
    },

    clearFunction() {
      store.password = '';
      this.nBtn = true;
      this.loading = false;
      this.token = '';
    },
  },
});
</script>
