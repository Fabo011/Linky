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
import AuthBtn from '../buttons/TheAuthButton.vue';
import LoadingButton from '../buttons/TheLoadingButton.vue';
import { generateRandomKey } from '../crypto/crypto';
import { supabase } from '../lib/supabaseClient';

export default defineComponent({
  name: 'TheLoginButton.vue',
  components: { LoadingButton, AuthBtn },

  data() {
    return {
      buttonText: 'Login',
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
      const email = store.email;
      const password = store.password;

      const options = {
          data: {
            tariff: 'free',
          },
        };
     
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error) {
          this.clearFucnction();
          store.state = 'authenticatedUser';
            this.$router.push(`/key`);
        } else {
          const { error } = await supabase.auth.signUp({ email, password, options });
          if (error) {
            this.errorText = 'If you try to login: Check username or password. If you try to login first time: Username already in use. Try another one.';
            this.clearFucnction();
          } else {
            this.clearFucnction();
            const { key, iv } = generateRandomKey();
            const digitalKey = `${key}.${iv}`;
            sessionStorage.setItem('key', digitalKey);
            store.state = 'newuser';
            this.$router.push(`/key`);
          }
        }
      } catch (error) {
        this.clearFucnction();
        this.errorText = 'Internal Error. Try again or contact support.';
      }
    },

    clearFucnction() {
      store.password = '';
      this.nBtn = true;
      this.loading = false;
   },
  },
});
</script>